import sqlite3
import pyodbc
from config import *

#DBconn = sqlite3.connect(SQL_DB)
DBconn = pyodbc.connect(connString)

queryCurs=DBconn.cursor()

queryCurs.execute('''CREATE TABLE messwerte
(id CHAR(32) PRIMARY KEY ON CONFLICT IGNORE, originAddr INTEGER, value DOUBLE, unit INTEGER, timestamp INTEGER)''')

queryCurs.execute('''CREATE TABLE stationen
(station_id INTEGER PRIMARY KEY, name VARCHAR(16), location VARCHAR(32), powerSaving BOOL )''')

queryCurs.execute('''CREATE TABLE einheiten
(unit_id INTEGER PRIMARY KEY, sensor VARCHAR(16), unit_name VARCHAR(16) )''')


DBconn.commit()
DBconn.close()
