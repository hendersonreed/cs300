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
var map_string = localStorage.getItem('map');
map_string = map_string.slice(1, map_string.length - 1) //removes start and ending [].
var split_string = map_string.split("][");


var i = 3;
/* 
	start i=3, so that we skip the first set of hashmarks
	this is probably safe because each map should have first an identifier, 
	then a size, then a row of hashmarks. 
	TODO - rather than skip the first data elements, we should store them.
*/

while(split_string[i][0] != '#') {  //stop once we hit the second string of hashes.
	++i;
}

++i; //go once further to pass the second string of hashes.
var coord_keys = [];

for (var iLen=split_string.length; i<iLen; i++) {
	split_cell = split_string[i].split(',');
	coord_key = split_cell[0] + ',' + split_cell[1]; //set coord_key to coords with comma.
	coord_keys.push(coord_key);
	localStorage.setItem(coord_key, split_string[i]); //notice we store the entire cell! 
	}

/* loop to display items.
for(var i = 0, iLen = coord_keys.length; i < iLen; ++i) {
	document.write(localStorage.getItem(coord_keys[i]) + "<br>");
}
*/
