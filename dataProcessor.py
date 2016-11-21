#!/usr/bin/env python
import base64
from struct import *
from collections import namedtuple
from shutil import copyfile


#copyfile("data.temp", "datafifo")

#hier data.temp loeschen

data = open("datafifo", "r")
for line in data:
       receivedData= line.partition(" ")
       decodedData=base64.b64decode(receivedData[2])             
       stationID, value, unit, timeid = unpack('<hfhL', decodedData)
       print "ID: %d Value: %f , Unit: %d, TimeID: %d" % (stationID, value, unit, timeid)
       
data.close()

#hier data_working loeschen

