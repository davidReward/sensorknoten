#! /usr/bin/python
import sqlite3

DBconn = sqlite3.connect('node1.db')
queryCurs=DBconn.cursor()

queryCurs.execute('''CREATE TABLE messwerte
(id INTEGER PRIMARY KEY, unit TEXT, value REAL)''')

DBconn.commit()
DBconn.close()