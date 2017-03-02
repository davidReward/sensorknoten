#! /usr/bin/python
import sqlite3

DBconn = sqlite3.connect('node1.db')
queryCurs=DBconn.cursor()

queryCurs.execute('''CREATE TABLE messwerte
(id TEXT PRIMARY KEY ON CONFLICT IGNORE, originAddr INTEGER, value REAL, unit INTEGER, timestamp INTEGER)''')

DBconn.commit()
DBconn.close()