import mysql.connector as mdb
from sss_config import *

def connectToDB():
	return mdb.connect(**configDB)
	
def writeDB(name, pos, description, date, url):
    DBconn = connectToDB()
    queryCurs = DBconn.cursor()

    queryCurs.execute(
	'INSERT INTO Manifesto (name, pos, description, date, url) VALUES (%s, %s, %s, %s, %s)', (name, pos, description, date, url ))

    DBconn.commit()


def readDB(name):
    DBconn = connectToDB()
    queryCurs = DBconn.cursor(dictionary=True)

    queryCurs.execute(
        'SELECT name, pos, description, date, url '
        'FROM Manifesto '
        'WHERE name LIKE %s; ', (name,))

    row = queryCurs.fetchall()
    row_json = [dict(rec) for rec in row]

    DBconn.close()
    return row_json

def readDB_all():
    DBconn = connectToDB()
    queryCurs = DBconn.cursor(dictionary=True)

    queryCurs.execute(
        'SELECT name, pos, description, date, url '
        'FROM Manifesto; ')


    row = queryCurs.fetchall()
    row_json = [dict(rec) for rec in row]

    DBconn.close()
    return row_json

	
