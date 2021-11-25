import matplotlib.pyplot as plt
import numpy as np
import tensorflow as tf
import tensorflow_hub as hub


def load_image

def transfer_style(content_image_path: str, style_image_path:str) -> None:
    
    
    
    content_image = plt.imread(content_image_path)
    style_image = plt.imread(style_image_path)
    content_image = content_image.astype(np.float32)[np.newaxis, ...] / 255.
    style_image = style_image.astype(np.float32)[np.newaxis, ...] / 255.
    style_image = tf.image.resize(style_image, (256, 256))

    # Load image stylization module.
    hub_module = hub.load('https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2')

    # Stylize image.
    outputs = hub_module(tf.constant(content_image), tf.constant(style_image))
    stylized_image = outputs[0]
    stylized_image.save('./test.png')

transfer_style("C:\Git\server_image\썸네일.png", "C:\Git\server_image\캡처.png")