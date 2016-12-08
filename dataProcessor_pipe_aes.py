#!/usr/bin/env python
import base64
import time
from struct import *

# TODO: Entschluesselung hinzufuegen!!

data = open("datafifo", "r")
while True:       
       #eine Zeile aus Pipe lesen
       dataLine= data.readline()
       
       # 29 ist die Laenge der Daten
       if 29 == len(dataLine):       
            
            #Daten von Zeitstempel trennen
            receivedData= dataLine.partition(" ")
            
            # Daten sind in base64 kodiert, also dekodieren:
            decodedData=base64.b64decode(receivedData[2])             
            
            # Muster um aus Bytes Struct zu rekonstruieren
            stationID, value, unit, timeid = unpack('<hfhL', decodedData)
            print "Unix time: %s , ID: %d Value: %f , Unit: %d, TimeID: %d" % (receivedData[0], stationID, value, unit, timeid)
       else:
            # wenn keine Daten in der Pipe, dann 3 Sekuden warten
            time.sleep(3)

