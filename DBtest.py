#! /usr/bin/python
import sqlite3
from random import randint

DBconn = sqlite3.connect('node1.db')

queryCurs=DBconn.cursor()

def addData(id, unit, value):
    queryCurs.execute('''INSERT INTO messwerte (id,unit,value)
    VALUES (?,?,?)''',(id,unit,value))


addData(randint(1,50000),'celsius',randint(15,50))
addData(randint(1,50000),'hpa',randint(900,1200))

DBconn.commit()

queryCurs.execute('SELECT * FROM messwerte')

for i in queryCurs:
    print i

DBconn.close()