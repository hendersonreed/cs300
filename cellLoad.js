/*
	File: map_extended.html
	Author: Henderson Hummel
	Date: 10/27/2018

	Purpose: parse and store game map contents.
	Description: In this file, we load our map from local storage, strip 
the delimiters,and store the contents in an array. Then, we skip through the 
contents to the cells themselves, which we then store as key-value pairs,
where the key is the x,y coordinates of the cell, and the cell contents are
the value portion.
*/
var mapString = localStorage.getItem('map');
mapString = mapString.slice(1, mapString.length - 1) //removes start and ending [].
var splitString = mapString.split("][");

//parsing and storing map contents.
var i = 0;
var mapIdentifier = splitString[i];
++i;
var mapSize= splitString[i];
i += 2 //skip the first hash mark separator.
var playerCoords = splitString[i].split(',');
var startingX = playerCoords[0];
var startingY = playerCoords[1];
var startingEnergy = splitString[i];
++i;
var startingWhiffles = splitString[i];
++i;

var inventory = []
while (splitString[i][0] != '#' ) { //store the players inventory.
	inventory.push(splitString[i]);
	++i;
}
++i //skip the last hash mark separator.

//here we run through the last section of the map_file, storing each cell
// in local storage.
for (var iLen=splitString.length; i<iLen; i++) {
	splitCell = splitString[i].split(',');
	localStorage.setItem(splitCell[0] + ',' + splitCell[1], splitCell); //notice we store the entire cell as an array!
	}
