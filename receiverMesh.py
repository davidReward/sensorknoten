import time
import base64
import hashlib
import mysql.connector as mdb
import signal
import sys
import logging
from RF24 import *
from struct import *
from config import *

logging.basicConfig(filename='/home/pi/sensorknoten/receiver.log', level=logging.WARNING, format='%(asctime)s - %(levelname)s - %(message)s')

irq_gpio_pin = None

radio = RF24(22, 0)
pipes = ["1Node", "2Node"]

DBconn = mdb.connect(**configRaspi)
queryCurs = DBconn.cursor()


def signal_handler(signal, frame):
    logging.info('Closing db connection...')
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
    str1 = str(stationID)
    str2 = str(messageID)
    str3 = str(timeID)
    toHash = str1 + str2 + str3
    hashed = hashlib.md5()
    hashed.update(toHash)
    return hashed.hexdigest()


def processData(stationID, messageID, timeID, originAddr, value, unit):
    ID_hashed = genearteID_hashed(stationID, messageID, timeID)
    writeToDatabase(ID_hashed, originAddr, value, unit)


def receive():
    if radio.available():
        while radio.available():
    		try:
	       		receive_payload = radio.read(radio.payloadSize)

	        	anz_paddings = (len(receive_payload) % 3) + 1
        		if anz_paddings > 1:
            			receive_payload += b'=' * anz_paddings
        		decodedData = base64.b64decode(receive_payload)
        		if len(decodedData) == 20:
                		destinationAddr, originAddr, lastHopAddr, messageID, stationID, value, unit, timeID = unpack('<hhhhhfhL', decodedData)
                		logging.info('StationId: ' + str(stationID) + '\tMessageID: ' + str(messageID) + '\tValue: ' + str(round(value, 2)))
        			processData(stationID, messageID, timeID, originAddr, round(value, 2), unit)
        		return
    		except TypeError:
    			logging.error('!!!!Fucking Base64')
    		except mdb.errors.InterfaceError:
    			logging.error('Mysql Fehler')
    			DBconn.reconnect(attempts=5, delay=5)
    		except Exception as e:
    			logging.error('anderer Fehler'+ str(e))
    	return


setup()
radio.printDetails()
# signal.signal(signal.SIGINT, signal_handler)

while 1:
    receive()
    time.sleep(1)

