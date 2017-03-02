#!/usr/bin/env python

# from __future__ import print_function
import time
import base64
import pdb
import RPi.GPIO as GPIO
import hashlib
import sqlite3
import signal
import sys

from RF24 import *
from struct import *

irq_gpio_pin = None

radio = RF24(22, 0)
pipes = ["1Node", "2Node"]

DBconn = sqlite3.connect('node1.db')

queryCurs=DBconn.cursor()


def signal_handler(signal, frame):
    print('Closing db connection...')
    DBconn.close()
    sys.exit(0)

def setup():
    radio.begin()
    radio.payloadSize = 28
    radio.enableDynamicPayloads()
    radio.setAutoAck(1)
    radio.setDataRate(RF24_250KBPS)
    radio.setPALevel(RF24_PA_MAX)
    radio.setChannel(90)
    radio.setRetries(15, 15)
    radio.setCRCLength(RF24_CRC_16)
    radio.openWritingPipe(pipes[0])
    radio.openReadingPipe(1, pipes[0])
    # radio.maskIRQ(0,0,1)
    radio.startListening()

def writeToDatabase(ID_hashed, originAddr, value, unit):
    timeStamp = int(time.time())
    queryCurs.execute('''INSERT INTO messwerte (id,originAddr,value,unit,timestamp)
    VALUES (?,?,?,?,?)''', (ID_hashed, originAddr, value, unit, timeStamp))
    DBconn.commit()

def genearteID_hashed(stationID, messageID, timeID):
    str1=str(stationID)
    str2=str(messageID)
    str3=str(timeID)
    toHash=str1+str2+str3
    hashed = hashlib.md5()
    hashed.update(toHash)
    return hashed.hexdigest()

def processData(stationID, messageID, timeID, originAddr, value, unit):
    ID_hashed = genearteID_hashed(stationID, messageID, timeID)
    writeToDatabase(ID_hashed, originAddr, value, unit)

def receive():
    if radio.available():
        while radio.available():
            receive_payload = radio.read(radio.payloadSize)
            decodedData = base64.b64decode(receive_payload)
            destinationAddr, originAddr, lastHopAddr, messageID, stationID, value, unit, timeID = unpack('<hhhhhfhL', decodedData)
            #print "destinationAddr: %d , originAddr: %d , lastHopAddr: %d , messageID: %d , ID: %d Value: %f , Unit: %d, TimeID: %d" % (destinationAddr,originAddr,lastHopAddr,messageID, stationID, value, unit, timeID)

            #print "Hash: %s" % genearteID_hashed(stationID,messageID,timeID)

            processData(stationID,messageID,timeID,originAddr,value,unit)

            queryCurs.execute('SELECT * FROM messwerte')

            #for i in queryCurs:
                #print i


# Hauptprogramm:
setup()
radio.printDetails()
print(" \n Hauptprogramm:")
signal.signal(signal.SIGINT, signal_handler)

while 1:
    receive()

    # spaeter durch interrupt ersetzten
    time.sleep(1)
