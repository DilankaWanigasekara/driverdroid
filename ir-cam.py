import RPi.GPIO as GPIO
import time
from picamera import PiCamera
from time import sleep

sensor = 40
ledGreen = 37

camera = PiCamera()

GPIO.setmode(GPIO.BOARD)
GPIO.setup(sensor,GPIO.IN)
GPIO.setup(ledGreen,GPIO.OUT)

GPIO.output(ledGreen,False)

camera.start_preview()

try: 
   while True:
      if GPIO.input(sensor):
          GPIO.output(ledGreen,False)
          camera.stop_preview()
          while GPIO.input(sensor):
              time.sleep(0.2)
      else:
          GPIO.output(ledGreen,True)

except KeyboardInterrupt:
      GPIO.cleanup()
      
GPIO.cleanup()
