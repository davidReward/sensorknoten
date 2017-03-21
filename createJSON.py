import sqlite3
from config import *

def queryDB_station(station):
    DBconn = sqlite3.connect(SQL_DB)
    # This enables column access by name: row['column_name']
    DBconn.row_factory = sqlite3.Row
    queryCurs = DBconn.cursor()

    queryCurs.execute(
         'SELECT MAX(timestamp) AS timestamp, originAddr, unit,unit_name,sensor ,id, value '
         'FROM messwerte '
         'INNER JOIN einheiten ON messwerte.unit = einheiten.unit_id '
         'WHERE originAddr=? GROUP BY unit',(station,))

    row = queryCurs.fetchall()
    row_json = [ dict(rec) for rec in row ]

    DBconn.close()
    return row_json
#TODO: implement functionality
def queryDB_station_interval(station, begin, end):
    DBconn = sqlite3.connect(SQL_DB)
    # This enables column access by name: row['column_name']
    DBconn.row_factory = sqlite3.Row
    queryCurs = DBconn.cursor()

    queryCurs.execute(
         'SELECT MAX(timestamp) AS timestamp, originAddr, unit,unit_name,sensor ,id, value '
         'FROM messwerte '
         'INNER JOIN einheiten ON messwerte.unit = einheiten.unit_id '
         'WHERE originAddr=? GROUP BY unit',(station,))

    row = queryCurs.fetchall()
    row_json = [ dict(rec) for rec in row ]

    DBconn.close()
    return row_json


def queryDB_id(id):
    DBconn = sqlite3.connect(SQL_DB)
    # This enables column access by name: row['column_name']
    DBconn.row_factory = sqlite3.Row
    queryCurs = DBconn.cursor()
    queryCurs.execute(
        'SELECT * '
        'FROM messwerte '
        'WHERE id=?', (id,))
    row = queryCurs.fetchall()
    row_json = [ dict(rec) for rec in row ]
    DBconn.close()
    return row_json

def queryDBallStation():
    DBconn = sqlite3.connect(SQL_DB)
    # This enables column access by name: row['column_name']
    DBconn.row_factory = sqlite3.Row
    queryCurs = DBconn.cursor()
    queryCurs.execute(
        'SELECT originAddr, name , location, powerSaving '
        'FROM messwerte '
        'INNER JOIN stationen ON stationen.station_id = messwerte.originAddr '
        'GROUP BY originAddr')
    row = queryCurs.fetchall()
    row_json = [ dict(rec) for rec in row ]
    DBconn.close()
    return row_json
