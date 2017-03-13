def createJSON():
    print 'Hello'

def queryDB(table, col, value):
    DBconn = sqlite3.connect('node1.db')
    queryCurs = DBconn.cursor()
    queryCurs.execute('SELECT * FROM {SQLtable} WHERE {SQLcol}={SQLvalue}'. \
                      format(SQLtable=table, SQLcol = col, SQLvalue = value))
    result = queryCurs.fetchall()
    print result
    DBconn.close()

#table="messwerte"
#col = "value"
#value="31.0"

#print queryDB(table, col, value)