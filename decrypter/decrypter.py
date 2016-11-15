#!/usr/bin/env python

import re
from cryptography.fernet import Fernet

key = ABCDEFGHIJKLMNOP
print "Der Schluessel lautet: %s" % key
cipher_suite = Fernet(key)


data = open("data.temp", "r")
for line in data:
    #if re.match("(.*)(L|l)ove(.*)", line):
       print line
       cipher_text= line.partition(" ")
       print cipher_text
       #plain_text = cipher_suite.decrypt(cipher_text)
       #print "Der entschluesselte Text lautet: %s " % plain_text

       

 


