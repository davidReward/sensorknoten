#!/usr/bin/env python
import sqlite3

DBconn = sqlite3.connect('node1.db')
queryCurs=DBconn.cursor()

query = DBconn.execute('SELECT * FROM messwerte')

DBconn.close()