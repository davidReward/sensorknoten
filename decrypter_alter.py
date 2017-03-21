import base64
#from cryptography.fernet import Fernet
from Crypto.Cipher import AES


#key =base64.urlsafe_b64encode('ABCDEFGHIJKLMNOPABCDEFGHIJKLMNOP')

key ='ABCDEFGHIJKLMNOPABCDEFGHIJKLMNOP'
IV = 16 * '\x00'
mode = AES.MODE_CBC


print "Der Schluessel lautet: %s" % key
cipher_suite = Fernet(key)

data = open("data.temp", "r")
for line in data:
       cipher_text= line.partition(" ")
       print cipher_text[2]       
       cipher_text_segment=cipher_text[2]
       plain_text = cipher_suite.decrypt((b"cipher_text_segment"))
       print "Der entschluesselte Text lautet: %s " % plain_text
