import sqlite3
import json


def createJSON():
    print 'Hello'

def queryDB(table, col, value):
    DBconn = sqlite3.connect('node1.db')
    queryCurs = DBconn.cursor()
    queryCurs.execute('SELECT * FROM {SQLtable} WHERE {SQLcol}={SQLvalue}'. \
                      format(SQLtable=table, SQLcol = col, SQLvalue = value))

    json_string = json.dumps(queryCurs.fetchall())
    DBconn.close()
    return json_string
