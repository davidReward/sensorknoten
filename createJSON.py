import sqlite3
import json
import sys

def queryDB(table, col, value, limit):
    DBconn = sqlite3.connect('node1.db')
    # This enables column access by name: row['column_name']
    DBconn.row_factory = sqlite3.Row
    queryCurs = DBconn.cursor()

    # queryCurs.execute('SELECT * FROM {SQLtable} WHERE {SQLcol}={SQLvalue} ORDER BY timestamp DESC LIMIT {SQLlimit}'. \
    #                   format(SQLtable=table, SQLcol=col, SQLvalue=value, SQLlimit=limit))


    queryCurs.execute('SELECT MAX(timestamp), originAddr, unit, id, value FROM {SQLtable} WHERE {SQLcol}={SQLvalue} GROUP BY unit'. \
                      format(SQLtable=table, SQLcol=col, SQLvalue=value, SQLlimit=limit))

    row = queryCurs.fetchall()
    row_json = [ dict(rec) for rec in row ]

    DBconn.close()
    return row_json

def queryDBallStation(table):
    DBconn = sqlite3.connect('node1.db')
    # This enables column access by name: row['column_name']
    DBconn.row_factory = sqlite3.Row
    queryCurs = DBconn.cursor()

    queryCurs.execute('SELECT originAddr FROM {SQLtable} GROUP BY originAddr'. \
                      format(SQLtable=table))

    row = queryCurs.fetchall()
    row_json = [ dict(rec) for rec in row ]

    DBconn.close()
    return row_json

#use this:
#SELECT MAX(timestamp),originAddr, unit, id, value from messwerte WHERE originAddr = 400 GROUP BY unit
