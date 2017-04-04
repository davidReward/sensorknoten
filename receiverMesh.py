import time
import base64
import hashlib
import mysql.connector as mdb
import signal
import sys
from RF24 import *
from struct import *
from config import *

irq_gpio_pin = None

radio = RF24(22, 0)
pipes = ["1Node", "2Node"]

DBconn = mdb.connect(**configRaspi)
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
    queryCurs.execute('''INSERT IGNORE INTO messwerte (id,originAddr,value,unit,timestamp)
    VALUES (%s,%s,%s,%s,%s)''', (ID_hashed, originAddr, value, unit, timeStamp))
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
            print len(receive_payload)
            decodedData = base64.b64decode(receive_payload)
            destinationAddr, originAddr, lastHopAddr, messageID, stationID, value, unit, timeID = unpack('<hhhhhfhL', decodedData)
            processData(stationID,messageID,timeID,originAddr,value,unit)

setup()
#radio.printDetails()
#signal.signal(signal.SIGINT, signal_handler)

while 1:
    receive()
    time.sleep(1)
