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
# import pyttsx3
import os
import gtts
from playsound import playsound
# engine = pyttsx3.init()
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

import threading

##################################################
EYE_AR_THRESH = 0.20
EYE_AR_CONSEC_FRAMES = 3
EYE_AR_CONSEC_FRAMES_2 = 8
COUNTER = 0
ALARM_ON = False

TOTAL = 0
##################################################
hSize = 200
wSize = 200

# dimensions of our images.
img_width, img_height = hSize, wSize

top_model_weights_path = 'bottleneck_fc_model.h5'
top_model_weights_path1 = 'bottleneck_fc_model1.h5'
# get data set for training
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
# boolean for alert voice
voiceFlag = False


def predict():
    lock.acquire()
    global voiceFlag
    global yawnflag
    # load the class_indices saved in the earlier step
    class_dictionary = np.load('class_indices.npy', allow_pickle=True).item()
    num_classes = len(class_dictionary)
    image_path = '1.jpg'
    # print("[INFO] loading and preprocessing image...")

    image1 = load_img(image_path, target_size=(hSize, wSize))
    image1 = img_to_array(image1)
    image1 = image1 / 255
    image1 = np.expand_dims(image1, axis=0)
    # print("BBBBBB")
    model = applications.VGG16(include_top=False, weights='vgg16_weights_tf_dim_ordering_tf_kernels_notop.h5')
    # print("BB")
    bottleneck_prediction = model.predict(image1)

    model = Sequential()
    model.add(Flatten(input_shape=bottleneck_prediction.shape[1:]))
    model.add(Dense(256, activation='relu'))
    model.add(Dropout(0.5))
    model.add(Dense(num_classes, activation='sigmoid'))

    model.load_weights(top_model_weights_path)

    # use the bottleneck prediction on the top model to get the final
    # classification
    class_predicted = model.predict_classes(bottleneck_prediction)

    probabilities = model.predict_proba(bottleneck_prediction)

    inID = class_predicted[0]

    inv_map = {v: k for k, v in class_dictionary.items()}

    label = inv_map[inID]

    # get the prediction label
    print("Image ID: {}".format(inID))

    if inID == 0:
        print(" Mouth close")

    if inID == 1:
        print("Mouth open")
        voiceFlag = True
        yawnflag = 1
    lock.release()


def predict1():
    global predict_flag
    global voiceFlag
    global headflag
    lock.acquire()
    # load the class_indices saved in the earlier step
    class_dictionary = np.load('class_indices1.npy', allow_pickle=True).item()
    num_classes = len(class_dictionary)
    image_path = '2.jpg'
    # print("[INFO] loading and preprocessing image...")

    # resize the images
    image2 = load_img(image_path, target_size=(hSize, wSize))
    image2 = img_to_array(image2)
    image2 = image2 / 255
    image2 = np.expand_dims(image2, axis=0)
    model = applications.VGG16(include_top=False, weights='vgg16_weights_tf_dim_ordering_tf_kernels_notop.h5')
    bottleneck_prediction = model.predict(image2)

    model = Sequential()
    model.add(Flatten(input_shape=bottleneck_prediction.shape[1:]))
    model.add(Dense(256, activation='relu'))
    model.add(Dropout(0.5))
    model.add(Dense(num_classes, activation='sigmoid'))

    model.load_weights(top_model_weights_path1)

    # use the bottleneck prediction on the top model to get the final
    # classification
    class_predicted = model.predict_classes(bottleneck_prediction)

    probabilities = model.predict_proba(bottleneck_prediction)

    inID = class_predicted[0]

    inv_map = {v: k for k, v in class_dictionary.items()}

    label = inv_map[inID]

    # get the prediction label
    print("Image ID: {}".format(inID))

    if (inID) == 0:
        print("Drowsy")
        voiceFlag = True
        headflag = 1
    if (inID) == 1:
        print("Alert")
    predict_flag = False
    lock.release()


W = 45


class ScaleValue:
    def __init__(self):
        self.value1 = 0
        self.value2 = 0


def tkinter_loop(scale):
    root = Tk()
    s1 = Scale(root, from_=0, to=200, tickinterval=8, command=lambda v: setattr(scale, 'value1', v))
    s1.set(76)
    W = s1.get()
    s1.pack()
    s2 = Scale(root, from_=0, to=100, tickinterval=10, orient=HORIZONTAL, command=lambda v: setattr(scale, 'value2', v))
    s2.set(20)
    s2.pack()

    root.mainloop()

# increase the brightness so that the features are more visible
def increase_brightness(img, value=30):
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    h, s, v = cv2.split(hsv)

    lim = 255 - value
    v[v > lim] = 255
    v[v <= lim] += value

    final_hsv = cv2.merge((h, s, v))
    img = cv2.cvtColor(final_hsv, cv2.COLOR_HSV2BGR)
    return img

# get six points on the eye to calculate eye aspect ratio
def eye_aspect_ratio(eye):
    A = dist.euclidean(eye[1], eye[5])
    B = dist.euclidean(eye[2], eye[4])
    C = dist.euclidean(eye[0], eye[3])
    ear = (A + B) / (2.0 * C)
    return ear


# initialize the frame counters and the total number of blinks
COUNTER = 0
TOTAL = 0
largeBlob = []
counterr = 0
counterr1 = 0
counterr2 = 0
windowClose = np.ones((5, 5), np.uint8)
windowOpen = np.ones((2, 2), np.uint8)
windowErode = np.ones((2, 2), np.uint8)
print("[INFO] loading facial landmark predictor...")
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")
(rStart, rEnd) = face_utils.FACIAL_LANDMARKS_IDXS["right_eye"]
print("[INFO] starting video stream thread...")
# vs = VideoStream(0).start()
cap = cv2.VideoCapture(0)
time.sleep(1.0)
w = 0
w1 = 1
w2 = 1
scale = ScaleValue()
threading.Thread(target=tkinter_loop, args=(scale,)).start()

count = 1
counnt = 0;
on = True
close = False
openn = False
data = ""
counnt2 = 0
tim = False
start_time_out = 50
eye_detect = False


def mouth():
    while True:
        if (predict_flag):
            predict()
            predict1()


def voice():
    global voiceFlag
    global eyeflag
    global yawnflag
    global headflag
    while True:
        if (voiceFlag == True):
            global count

            tts = gTTS(text="Alert", lang='en')
            tts.save(f'speech{count % 2}.mp3')
            mixer.init()
            mixer.music.load(f'speech{count % 2}.mp3')
            mixer.music.play()
            count += 1

            voiceFlag = False


w1 = threading.Thread(name='voice', target=voice)
w1.start()
w3 = threading.Thread(name='mouth', target=mouth)
w3.start()

while True:
    W = float(scale.value1)
    B = int(scale.value2)

    ret, frame = cap.read()
    if (ret):

        frame = imutils.resize(frame, width=450)
        frame = increase_brightness(frame, B)
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        eye_detect = False
        # detect faces in the grayscale frame
        rects = detector(gray, 0)
        for rect in rects:
            eye_detect = True
            counterr = counterr + 1
            counterr1 = counterr1 + 1
            counterr2 = counterr2 + 1
            shape = predictor(gray, rect)
            shape = face_utils.shape_to_np(shape)
            (x1, y1, w1, h1) = face_utils.rect_to_bb(rect)
            cv2.rectangle(frame, (x1, y1 - 80), (x1 + w1, y1 + h1 + 20), (0, 255, 0), 2)

            face = frame[y1 - 80:y1 + h1 + 20, x1 - 20:x1 + w1 + 20]

            if (face.size > 0):
                cv2.imshow("face", face)
            leftEye = shape[lStart:lEnd]
            rightEye = shape[rStart:rEnd]
            leftEAR = eye_aspect_ratio(leftEye)
            rightEAR = eye_aspect_ratio(rightEye)
            ear = (float(leftEAR) + float(rightEAR)) / 2.0
            leftEyeHull = cv2.convexHull(leftEye)
            rightEyeHull = cv2.convexHull(rightEye)
            cv2.drawContours(frame, [leftEyeHull], -1, (0, 255, 0), 1)
            cv2.drawContours(frame, [rightEyeHull], -1, (0, 255, 0), 1)
            if ear < EYE_AR_THRESH:
                COUNTER += 1
            else:
                if COUNTER >= EYE_AR_CONSEC_FRAMES:
                    TOTAL += 1
                COUNTER = 0
            cv2.putText(frame, "Blinks: {}".format(TOTAL), (10, 30),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
            cv2.putText(frame, "EAR: {:.2f}".format(ear), (300, 30),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
            cv2.putText(frame, "Count: {}".format(COUNTER), (10, 300),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
            if COUNTER >= EYE_AR_CONSEC_FRAMES_2:

                if not ALARM_ON:
                    ALARM_ON = True
                cv2.putText(frame, "DROWSINESS ALERT!", (10, 80),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
                eyeflag = 1
                voiceFlag = True

            else:
                ALARM_ON = False
            #####################################################################
            mouth = shape[48:68]
            mouthHull = cv2.convexHull(mouth)
            x = (mouthHull[0][0][0])
            y = (mouthHull[1][0][1])
            mouth = frame[(y - 20):y + 60, (x - 20):x + 60]
            # mouth=frame[(y-20):y+20 , (x-40):x+10]
            im_gray = cv2.cvtColor(mouth, cv2.COLOR_BGR2GRAY)
            circles = cv2.HoughCircles(im_gray, cv2.HOUGH_GRADIENT, 1, 1, param1=50, param2=30, minRadius=0,
                                       maxRadius=10)
            if circles is not None:
                circles = numpy.round(circles[0, :]).astype("int")
                for i in circles[0, :]:
                    cv2.circle(frame, (i[0], i[1]), i[2], (255, 255, 0), 2)
                    cv2.circle(frame, (i[0], i[1]), 2, (0, 255, 255), 3)
            cv2.drawContours(frame, [mouthHull], -1, (0, 255, 0), 1)

            if (predict_flag == False):
                cv2.imwrite("1.jpg", mouth)
                if (face.size > 0):
                    cv2.imwrite("2.jpg", face)
                predict_flag = True

            cv2.imshow("mouth", mouth)
            (thresh, im_bw) = cv2.threshold(im_gray, W, 255, cv2.THRESH_BINARY)
        cv2.imshow("Frame", frame)
        key = cv2.waitKey(1) & 0xFF
        if key == ord("q"):
            break
# do a bit of cleanup
cv2.destroyAllWindows()
vs.stop()
