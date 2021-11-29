# from cv2 import imread, imencode
from io import BytesIO

import tensorflow as tf
import tensorflow_hub as hub


def tf_read(image: str):
    img = tf.io.decode_image(image, channels=3, dtype=tf.float32)[tf.newaxis, ...]
    return img


def transfer_style(content_image: str, style_image: str, save_path: str) -> BytesIO:

    # hub_module = hub.load('style_transfer')
    hub_handle = "https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2"
    hub_module = hub.load(hub_handle)

    outputs = hub_module(tf.constant(content_image), tf.constant(style_image))
    outputs = outputs[0][0].numpy()

    tf.keras.utils.save_img("test.jpg", outputs)

    # cv2img = imread('test.jpg')
    # res, im_jpg = imencode(".jpg", cv2img)
    # encoded_image = BytesIO(im_jpg.tobytes())

    # return encoded_image
