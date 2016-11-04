#!/usr/bin/env python
from cryptography.fernet import Fernet

key = Fernet.generate_key()
cipher_suite = Fernet(key)
print "Der Key ist:% s" % key
cipher_text = cipher_suite.encrypt(b"A really secret message. Not for prying eyes.")
print "Der verschluesselte Text lautet: %s" % cipher_text
plain_text = cipher_suite.decrypt(cipher_text)
print "Der entschluesselte Text %s" % plain_text



