#!/usr/bin/python3

###############################################################################
#
#   File: createJS
#   Authors: Henderson Hummel, Warren Harrison
#
#   Purpose: generate a .js file used by Frupal.html to save the map contents.
#   Description: This script takes a map file and outputs some javascript code
#       to save the map file to localStorage.
#
###############################################################################

mapFile = open("map_file")
redirectURL = "http://web.cecs.pdx.edu/~hhummel/frupal/map_extended.html"
storageLine = ""
for mapLine in mapFile:
	storageLine = storageLine + "[" + mapLine.rstrip() + "]"
mapFile.closed
print("localStorage.setItem('map','"+storageLine+"')")
