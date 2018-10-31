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


var i = 3;
/* 
	start i=3, so that we skip the first set of hashmarks
	this is probably safe because each map should have first an identifier, 
	then a size, then a row of hashmarks. 
	TODO - rather than skip the first data elements, we should store them.
*/

while(splitString[i][0] != '#') {  //stop once we hit the second string of hashes.
	++i;
}

++i; //go once further to pass the second string of hashes.
//var coord_keys = [];

for (var iLen=splitString.length; i<iLen; i++) {
	splitCell = splitString[i].split(',');
	localStorage.setItem(splitCell[0] + ',' + splitCell[1], splitString[i]); //notice we store the entire cell! 
/*
	coord_key = splitCell[0] + ',' + splitCell[1]; //set coord_key to coords with comma.
	coord_keys.push(coord_key);
	localStorage.setItem(coord_key, splitString[i]); //notice we store the entire cell! 
*/
	}

/* loop to display items.
for(var i = 0, iLen = coord_keys.length; i < iLen; ++i) {
	document.write(localStorage.getItem(coord_keys[i]) + "<br>");
}
*/
