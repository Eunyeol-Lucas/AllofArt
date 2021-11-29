from io import BytesIO

import tensorflow as tf
from PIL import Image


def read_imagefile(file) -> Image.Image:
    image = Image.open(BytesIO(file))
    return image


def tf_read(image: str):
    img = tf.io.decode_image(image, channels=3, dtype=tf.float32)[tf.newaxis, ...]
    return img
