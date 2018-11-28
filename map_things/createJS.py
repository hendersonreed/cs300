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

mapFile = open("final_map.txt")
storageLine = ""
for mapLine in mapFile:
    storageLine = storageLine + "[" + mapLine.rstrip() + "]"
mapFile.closed
print("localStorage.setItem('map','"+storageLine+"')")
