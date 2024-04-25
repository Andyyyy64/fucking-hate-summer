from machine import Pin
import utime as time
from dht import DHT11

try:
    import urequests as requests
except:
    import requests

try:
    import ujson as json
except:
    import json

import network

import gc
gc.collect()


ssid = "CNLab-wifi"
password = "uoacnlab2023"
url = "https://ntfy.sh/aaasssuuu"

station = network.WLAN(network.STA_IF)

station.active(True)
station.connect(ssid, password)

while station.isconnected() == False:
    pass

print('connection successful')
print(station.ifconfig())

while True:
    time.sleep(1)
    pin = Pin(28, Pin.OUT, Pin.PULL_DOWN)
    sensor = DHT11(pin)
    sensor.measure()
    print("Temperature: {}".format(sensor.temperature()))
    print("Humidity: {}".format(sensor.humidity()))

    if sensor.temperature() > 27.0:
        res = requests.post(url, data="labo is too hot")
