#!/usr/bin/env python
print "Hallo!!"


def fac(n):
    if n==1:
        return 1
    else:
        return n*fac(n-1)
    
result=fac(5)

print "%d" %result

