# from cv2 import imread, imencode
from io import BytesIO

import tensorflow as tf
import tensorflow_hub as hub


def tf_read(image_path: str):
    img = tf.io.decode_image(tf.io.read_file(image_path), channels=3, dtype=tf.float32)[
        tf.newaxis, ...
    ]
    return img


def transfer_style(
    content_image_path: str, style_image_path: str, save_path: str
) -> BytesIO:
    try:
        content_image = tf_read(content_image_path)
        style_image = tf_read(style_image_path)

        # hub_module = hub.load('style_transfer')
        hub_handle = (
            "https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2"
        )
        hub_module = hub.load(hub_handle)

        outputs = hub_module(tf.constant(content_image), tf.constant(style_image))
        outputs = outputs[0][0].numpy()

        tf.keras.utils.save_img(save_path, outputs)
        return {
            "status": "successed",
            "image_path": {
                "transfer_image_path": save_path,
                "content_image_path": content_image_path,
                "style_image_path": style_image_path,
            },
        }

    except:
        return {"status": "failed"}
