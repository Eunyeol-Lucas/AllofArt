# from keras.models import load_model
import numpy as np
from PIL import Image, ImageOps
from tensorflow.keras.models import load_model
import tensorflow as tf

from app.ai.style_cls.labels import label_list


def classify_style(image: Image, extension: str) -> dict:
    # Load the model
    # model = load_model('./saved_model/keras_model.h5')
    model = load_model("app/ai/style_cls/keras_model.h5", compile=False)

    # Create the array of the right shape to feed into the keras model
    # The 'length' or number of images you can put into the array is
    # determined by the first position in the shape tuple, in this case 1.
    data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)
    # Replace this with the path to your image

    if extension == "png":
        image = image.convert("RGB")
    # resize the image to a 224x224 with the same strategy as in TM2:
    # resizing the image to be at least 224x224 and then cropping from the center
    size = (224, 224)
    image = ImageOps.fit(image, size, Image.ANTIALIAS)

    # turn the image into a numpy array
    image_array = np.asarray(image)
    # Normalize the image
    normalized_image_array = (image_array.astype(np.float32) / 127.0) - 1
    # Load the image into the array
    data[0] = normalized_image_array

    # run the inference

    probabilities = (model.predict(data)[0] * 100).tolist()

    result = {painter: prob for painter, prob in zip(label_list, probabilities)}
    tf.keras.backend.clear_session()

    return result
