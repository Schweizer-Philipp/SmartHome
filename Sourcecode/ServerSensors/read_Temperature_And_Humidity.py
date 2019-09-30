import Adafruit_DHT
import time

time.sleep(3)

DHT_SENSOR = Adafruit_DHT.DHT22

Input_Pin  = 25

while True:

    humidity, temperature = Adafruit_DHT.read(DHT_SENSOR,Input_Pin)
    
    if not (humidity is None or temperature is None):
        break;

print(str(temperature)+";"+str(humidity))