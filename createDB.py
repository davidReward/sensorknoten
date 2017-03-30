import mysql.connector as mdb

from config import *

DBconn = mdb.connect(**config)

queryCurs=DBconn.cursor()

queryCurs.execute('''CREATE TABLE IF NOT EXISTS messwerte
(id CHAR(32) PRIMARY KEY, originAddr INTEGER, value DOUBLE, unit INTEGER, timestamp INTEGER)''')

queryCurs.execute('''CREATE TABLE IF NOT EXISTS stationen
(station_id INTEGER PRIMARY KEY, name VARCHAR(16), location VARCHAR(32), powerSaving BOOL )''')

queryCurs.execute('''CREATE TABLE IF NOT EXISTS einheiten
(unit_id INTEGER PRIMARY KEY, sensor VARCHAR(16), unit_name VARCHAR(32) )''')


DBconn.commit()
DBconn.close()
