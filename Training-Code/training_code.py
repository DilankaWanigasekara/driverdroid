from resizeimage import resizeimage
from scipy.spatial import distance as dist
from imutils.video import FileVideoStream
from imutils.video import VideoStream
from imutils import face_utils
import numpy as np
import argparse
import imutils
import time
import dlib
import mmap
from tkinter import *
import threading
import numpy as np
from keras.preprocessing.image import ImageDataGenerator, img_to_array, load_img
from keras.models import Sequential
from keras.layers import Dropout, Flatten, Dense
from keras import applications
from keras.utils.np_utils import to_categorical
import matplotlib.pyplot as plt
import math
import cv2
import os
import gtts
from playsound import playsound
from PIL import Image

Image.LOAD_TRUNCATED_IMAGES = True
predict_flag = False
import httplib2
import urllib3
import time
import requests
from pygame import mixer
from gtts import gTTS

count = 0
eyeflag = 0
yawnflag = 0
headflag = 0

##################################################

hSize = 200
wSize = 200

# dimensions of our images.
img_width, img_height = hSize, wSize

top_model_weights_path = 'bottleneck_fc_model.h5'
top_model_weights_path1 = 'bottleneck_fc_model1.h5'
train_data_dir = 'training_set'
validation_data_dir = 'test_set'

train_data_dir1 = 'training_set1'
validation_data_dir1 = 'test_set1'
# grab the indexes of the facial landmarks for the left and
# right eye, respectively
(lStart, lEnd) = face_utils.FACIAL_LANDMARKS_IDXS["left_eye"]
(rStart, rEnd) = face_utils.FACIAL_LANDMARKS_IDXS["right_eye"]
# number of epochs to train top model
epochs = 50
# batch size used by flow_from_directory and predict_generator
batch_size = 16

lock = threading.Lock()
voiceFlag = False


def save_bottlebeck_features():  # for the Yawning Part
    # build the VGG16 network
    model = applications.VGG16(include_top=False,
                               weights='vgg16_weights_tf_dim_ordering_tf_kernels_notop.h5')  # VGG-16 is a pre-trained model used for image classification.
    datagen = ImageDataGenerator(rescale=1. / 255)
    generator = datagen.flow_from_directory(  # Taking and resizing the Dataset as Needed
        train_data_dir,
        target_size=(img_width, img_height),
        batch_size=batch_size,
        class_mode=None,
        shuffle=False)
    print(len(generator.filenames))
    print(generator.class_indices)
    print(len(generator.class_indices))

    nb_train_samples = len(generator.filenames)
    num_classes = len(generator.class_indices)

    predict_size_train = int(math.ceil(nb_train_samples / batch_size))

    bottleneck_features_train = model.predict(
        generator, predict_size_train)

    np.save('bottleneck_features_train.npy', bottleneck_features_train)

    generator = datagen.flow_from_directory(
        validation_data_dir,
        target_size=(img_width, img_height),
        batch_size=batch_size,
        class_mode=None,
        shuffle=False)

    nb_validation_samples = len(generator.filenames)

    predict_size_validation = int(
        math.ceil(nb_validation_samples / batch_size))

    bottleneck_features_validation = model.predict_generator(
        generator, predict_size_validation)

    np.save('bottleneck_features_validation.npy',
            bottleneck_features_validation)


def save_bottlebeck_features1():  # For the Alert and Drowsy Part
    # build the VGG16 network
    model = applications.VGG16(include_top=False, weights='vgg16_weights_tf_dim_ordering_tf_kernels_notop.h5')
    datagen1 = ImageDataGenerator(
        rescale=1. / 255)  # original images consist in RGB coefficients in the 0-255, but such values would be too
    # high for our model to process therefore we target values between 0 and 1 instead by scaling with a 1/255.
    generator1 = datagen1.flow_from_directory(
        train_data_dir1,
        target_size=(img_width, img_height),
        batch_size=batch_size,
        class_mode=None,
        shuffle=False)
    print(len(generator1.filenames))
    print(generator1.class_indices)
    print(len(generator1.class_indices))

    nb_train_samples1 = len(generator1.filenames)
    num_classes1 = len(generator1.class_indices)

    predict_size_train1 = int(math.ceil(nb_train_samples1 / batch_size))

    bottleneck_features_train1 = model.predict_generator(
        generator1, predict_size_train1)

    np.save('bottleneck_features_train1.npy', bottleneck_features_train1)

    generator1 = datagen1.flow_from_directory(
        validation_data_dir1,
        target_size=(img_width, img_height),
        batch_size=batch_size,
        class_mode=None,
        shuffle=False)

    nb_validation_samples1 = len(generator1.filenames)

    predict_size_validation1 = int(
        math.ceil(nb_validation_samples1 / batch_size))

    bottleneck_features_validation1 = model.predict(
        generator1, predict_size_validation1)

    np.save('bottleneck_features_validation1.npy',
            bottleneck_features_validation1)


def train_top_model():
    datagen_top = ImageDataGenerator(
        rescale=1. / 255)  # ImageDataGenerator class is used to expand the training dataset in order to improve the
    # performance and ability of the model to generalize and original images consist in RGB coefficients in the
    # 0-255, but such values would be too high for our model to process therefore we target values between 0 and 1
    # instead by scaling with a 1/255.
    generator_top = datagen_top.flow_from_directory(
        train_data_dir,
        target_size=(img_width, img_height),
        batch_size=batch_size,
        class_mode='categorical',
        shuffle=False)

    nb_train_samples = len(generator_top.filenames)
    num_classes = len(generator_top.class_indices)

    # save the class indices to use use later in predictions
    np.save('class_indices.npy', generator_top.class_indices)

    # load the bottleneck features saved earlier
    train_data = np.load('bottleneck_features_train.npy')

    # get the class labels for the training data, in the original order
    train_labels = generator_top.classes

    # convert the training labels to categorical vectors
    train_labels = to_categorical(train_labels, num_classes=num_classes)

    generator_top = datagen_top.flow_from_directory(
        validation_data_dir,
        target_size=(img_width, img_height),
        batch_size=batch_size,
        class_mode=None,
        shuffle=False)

    nb_validation_samples = len(generator_top.filenames)

    validation_data = np.load('bottleneck_features_validation.npy')

    validation_labels = generator_top.classes
    validation_labels = to_categorical(
        validation_labels, num_classes=num_classes)

    model = Sequential()  # Using the Sequential Model
    model.add(Flatten(input_shape=train_data.shape[1:]))
    model.add(Dense(256, activation='relu'))
    model.add(Dropout(0.5))
    model.add(Dense(num_classes, activation='sigmoid'))

    model.compile(optimizer='rmsprop',
                  loss='categorical_crossentropy', metrics=['accuracy'])

    history = model.fit(train_data, train_labels,  # model.fit is used to train the Data
                        epochs=epochs,
                        batch_size=batch_size,
                        validation_data=(validation_data, validation_labels))
    # print(history)

    model.save_weights(top_model_weights_path)
    model.save(top_model_weights_path)

    (eval_loss, eval_accuracy) = model.evaluate(
        validation_data, validation_labels, batch_size=batch_size, verbose=1)

    print("[INFO] accuracy: {:.2f}%".format(eval_accuracy * 100))
    print("[INFO] Loss: {}".format(eval_loss))


def train_top_model1():
    datagen_top1 = ImageDataGenerator(rescale=1. / 255)
    generator_top1 = datagen_top1.flow_from_directory(
        train_data_dir1,
        target_size=(img_width, img_height),
        batch_size=batch_size,
        class_mode='categorical',
        shuffle=False)

    nb_train_samples1 = len(generator_top1.filenames)
    num_classes1 = len(generator_top1.class_indices)

    # save the class indices to use use later in predictions
    np.save('class_indices1.npy', generator_top1.class_indices)

    # load the bottleneck features saved earlier
    train_data1 = np.load('bottleneck_features_train1.npy')

    # get the class lebels for the training data, in the original order
    train_labels1 = generator_top1.classes

   
    # convert the training labels to categorical vectors
    train_labels1 = to_categorical(train_labels1, num_classes=num_classes1)

    generator_top1 = datagen_top1.flow_from_directory(
        validation_data_dir1,
        target_size=(img_width, img_height),
        batch_size=batch_size,
        class_mode=None,
        shuffle=False)

    nb_validation_samples1 = len(generator_top1.filenames)

    validation_data1 = np.load('bottleneck_features_validation1.npy')

    validation_labels1 = generator_top1.classes
    validation_labels1 = to_categorical(
        validation_labels1, num_classes=num_classes1)

    model = Sequential()
    model.add(Flatten(input_shape=train_data1.shape[1:]))
    model.add(Dense(256, activation='relu'))
    model.add(Dropout(0.5))
    model.add(Dense(num_classes1, activation='sigmoid'))

    model.compile(optimizer='rmsprop',
                  loss='categorical_crossentropy', metrics=['accuracy'])

    history = model.fit(train_data1, train_labels1,
                        epochs=epochs,
                        batch_size=batch_size,
                        validation_data=(validation_data1, validation_labels1))
    # print(history)
    model.save_weights(top_model_weights_path1)
    model.save(top_model_weights_path1)

    (eval_loss1, eval_accuracy1) = model.evaluate(
        validation_data1, validation_labels1, batch_size=batch_size, verbose=2)

    print("[INFO] accuracy: {:.2f}%".format(eval_accuracy1 * 100))
    print("[INFO] Loss: {}".format(eval_loss1))


######################################################
# save_bottlebeck_features()
# train_top_model()
###################################################
######################################################
save_bottlebeck_features1()
train_top_model1()
###################################################
