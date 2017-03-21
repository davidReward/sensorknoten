import sqlite3
from constants import SQL_DB

DBconn = sqlite3.connect(SQL_DB)
queryCurs=DBconn.cursor()

queryCurs.execute('''CREATE TABLE messwerte
(id TEXT PRIMARY KEY ON CONFLICT IGNORE, originAddr INTEGER, value REAL, unit INTEGER, timestamp INTEGER)''')

queryCurs.execute('''CREATE TABLE stationen
(station_id INTEGER PRIMARY KEY, name TEXT, location TEXT, powerSaving INTEGER )''')

queryCurs.execute('''CREATE TABLE einheiten
(unit_id INTEGER PRIMARY KEY, sensor TEXT, unit_name TEXT )''')


DBconn.commit()
DBconn.close()
