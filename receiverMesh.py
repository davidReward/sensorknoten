#!/usr/bin/env python

# from __future__ import print_function
import time
from RF24 import *
import base64
import pdb
import RPi.GPIO as GPIO
from struct import *

irq_gpio_pin = None

radio = RF24(22, 0)
pipes = ["1Node", "2Node"]


def setup():
    radio.begin()
    radio.payloadSize = 28
    radio.enableDynamicPayloads()
    radio.setAutoAck(1)
    radio.setDataRate(RF24_250KBPS)  # 250kbs
    radio.setPALevel(RF24_PA_MAX)
    radio.setChannel(90)
    radio.setRetries(15, 15)
    radio.setCRCLength(RF24_CRC_16)
    radio.openWritingPipe(pipes[0])
    radio.openReadingPipe(1, pipes[0])
    # radio.maskIRQ(0,0,1)
    radio.startListening()


def writeToFile(received_payload):
    # print('Got payload size={} value="{}"'.format(radio.payloadSize, received_payload.decode('utf-8')))

    # Timestamp erzeugen
    utime_str = str(int(time.time()))

    data.write(utime_str + " " + received_payload + " \n")
    data.flush()

def writeToDatabase(ID_hased, originAddr, value, unit):
    print "Test"

def genearteID_hashed(stationID, messageID, timeID):
    str1=str(stationID)
    str2=str(messageID)
    str3=str(timeID)
    toHash=str1+str2+str3
    hashed=0 # genrate Hash here
    return hashed


def receive():
    if radio.available():
        while radio.available():
            receive_payload = radio.read(radio.payloadSize)
            print "Kodiert: %s" % receive_payload
            decodedData = base64.b64decode(receive_payload)
            destinationAddr, originAddr, lastHopAddr, messageID, stationID, value, unit, timeid = unpack('<hhhhhfhL', decodedData)
            print "destinationAddr: %d , originAddr: %d , lastHopAddr: %d , messageID: %d , ID: %d Value: %f , Unit: %d, TimeID: %d" % (destinationAddr,originAddr,lastHopAddr,messageID, stationID, value, unit, timeid)
            print "Dekodiert: %s" % decodedData

            #writeToFile(receive_payload)


# Hauptprogramm:
setup()
radio.printDetails()
data = open('data', 'a+')
print(" \n Hauptprogramm:")
while 1:
    receive()

    # spaeter durch interrupt ersetzten
    time.sleep(1)
data.close()
