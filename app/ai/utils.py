from io import BytesIO

from PIL import Image


def read_imagefile(file) -> Image.Image:
    image = Image.open(BytesIO(file))
    return image


def preprocess_for_style_transfer(image_path):
    img = tf.io.decode_image(tf.io.read_file(image_path), channels=3, dtype=tf.float32)[
        tf.newaxis, ...
    ]

    img = tf.image.resize(img, image_size, preserve_aspect_ratio=True)
    return img
