#!/usr/bin/env python

import re
from cryptography.fernet import Fernet

key = Fernet.generate_key()
print "Der Schluessel lautet: %s" % key
cipher_suite = Fernet(key)
cipher_text = cipher_suite.encrypt(b"A really secret message. Not for prying eyes.")
print "Der verschluesselte Text lautet: %s" % cipher_text
plain_text = cipher_suite.decrypt(cipher_text)
print "Der entschluesselte Text lautet: %s " % plain_text


data = open("data.temp", "r")

for line in data:
    if re.match("(.*)(L|l)ove(.*)", line):
        print line,
