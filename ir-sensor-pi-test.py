import RPi.GPIO as GPIO
import time

sensor = 40
ledGreen = 37

GPIO.setmode(GPIO.BOARD)
GPIO.setup(sensor,GPIO.IN)
GPIO.setup(ledGreen,GPIO.OUT)

GPIO.output(ledGreen,False)
print("IR Sensor Ready.....")
print("")

try: 
  while True:
    print(GPIO.input(sensor))

    if GPIO.input(sensor):
      GPIO.output(ledGreen,True)
      print("Object Detected")
      while GPIO.input(sensor):
        time.sleep(0.2)
    else:
      GPIO.output(ledGreen,False)


except KeyboardInterrupt:
  GPIO.cleanup()
