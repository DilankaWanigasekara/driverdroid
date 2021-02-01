from picamera import PiCamera
from time import sleep

camera = PiCamera()

camera.start_preview()

input("any key to exit")

camera.stop_preview()