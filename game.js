/*
	File: Frupal.html
	Authors: Henderson Hummel, James Hiebert, Cody Jeffries, Eric Frazier, Suliman Alsarraf, Dante Kiaunis, Tejas Menon
	Date 10/27/2018

	Purpose: display the game to user.
	Description: This is our managing javascript section. It's exceedingly 
	preliminary, so much of this will change.

	Also! This page is in active development, so if you're reading this 
	because the page is broken, well, that's to be expected.
*/

const MAX = mapSize; //ADDED FROM CELLLOAD.JS NOW THAT ITS FIXED
const MAPSIZE = 5; //Distance from the player that tiles should be drawn. THIS CONST ISN'T USED ANYWHERE AS OF NOW
/*var canvas = {
	width: 400, 
	height: 400,
};*/

var canvas;
var canvasContext;

/*document.addEventListener('DOMContentLoaded',function(){
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	//colorRect(0, 0, canvas.width, canvas.height, 'grey')
	//game.displayMap();


})*/

//canvas.width = 400;
//canvas.height = 400;
var leftX = 0;
var topY = 0;
const tileWidth = 20;
const tileHeight = 20;

function drawEverything() {
	colorRect(0, 0, canvas.width, canvas.height, 'grey')
	drawMeadow();
	drawForest();
	drawWater();
	drawWall();
	drawBog();
	drawSwap();
}
function drawMeadow() {
	canvasContext.fillStyle = 'lawngreen';
	canvasContext.fillRect(leftX, topY, tileWidth, tileHeight);
	topY += tileWidth;
	if (topY >= tileWidth) {
		leftX += tileHeight;
		topY = 0;
	}
}
function drawForest() {
	canvasContext.fillStyle = 'forestgreen';
	canvasContext.fillRect(leftX, topY, tileWidth, tileHeight);
	topY += tileWidth;
	if (topY >= tileWidth) {
		leftX += tileHeight;
		topY = 0;
	}
}
function drawWater() {
	canvasContext.fillStyle = 'aqua';
	canvasContext.fillRect(leftX, topY, tileWidth, tileHeight);
	topY += tileWidth;
	if (topY >= tileWidth) {
		leftX += tileHeight;
		topY = 0;
	}
}
function drawWall() {
	canvasContext.fillStyle = 'gainsboro';
	canvasContext.fillRect(leftX, topY, tileWidth, tileHeight);
	topY += tileWidth;
	if (topY >= tileWidth) {
		leftX += tileHeight;
		topY = 0;
	}
}
function drawBog() {
	canvasContext.fillStyle = 'darkolivegreen';
	canvasContext.fillRect(leftX, topY, tileWidth, tileHeight);
	topY += tileWidth;
	if (topY >= tileWidth) {
		leftX += tileHeight;
		topY = 0;
	}
}
function drawSwap() {
	canvasContext.fillStyle = 'olive';
	canvasContext.fillRect(leftX, topY, tileWidth, tileHeight);
	topY += tileWidth;
	if (topY >= tileWidth) {
		leftX += tileHeight;
		topY = 0;
	}
}
function colorRect(leftX, topY, width, height, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX, topY, width, height);

}
var game = {
	//All the variables are being pulled from cellLoad.js now. We can completely remove them but let's do that later
	x_coord : startingX,
	y_coord : startingY,
	whiffles: startingWhiffles,
	energy : startingEnergy,
	invArray: [0,0,0,0,0,0,0,0,0,0,0],

	mapString: "",
	mapMode : 0, //0 for mini-map, 1 for full map

	// Comment the below line, if we choose to add the jewels as an
	//  item in the map file.
	//jewels : {x: Math.round((Math.random() * 1000) % (MAX + 1)), y: Math.round((Math.random() * 1000) % (MAX + 1))},
	jewels : jewelLoc,

	//This is our "main" function. It is run every time a button is pressed on our html page.
	go: function (direc) {
		var water = false;
		switch (direc) {
			case 'n':
				this.goNorth();
				water = this.checkWater(this.x_coord, this.y_coord);
				if(water == true){
					break;
				}
				this.goSouth();
				water = this.checkWater(this.x_coord, this.y_coord);
				if(water == true){
					break;
				}
				this.goNorth();
				break;
			case 'e':
				this.goEast();
				water = this.checkWater(this.x_coord, this.y_coord);
				if(water == true){
					break;
				}
				this.goWest();
				break;
			case 'w':
				this.goWest();
				water = this.checkWater(this.x_coord, this.y_coord);
				if(water == true){
					break;
				}
				this.goEast();
				break;
			case 's':
				this.goSouth();
				water = this.checkWater(this.x_coord, this.y_coord);
				if(water == true){
					break;
				}
				this.goNorth();
				break;
			default:
				this.y_coord = 0;
				this.x_coord = 0;
				break;
		}
		//technically, the below statements are just to satisfy the packet. 
		// It required that we save the user's data in a state file.
		localStorage.setItem('x_coord', this.x_coord);
		localStorage.setItem('y_coord', this.y_coord);

		this.alterFlags(); //edits visibility for fog of war.
		this.dispLoc(); //adds player location to <div> in html.
		this.dispWhif();
		this.checkLoc(); //displays cell contents to player. TODO: Shouldn't be in our final product.
        this.checkObstacle();
		this.checkEnergy(); //checks energy and alerts user if energy < 0.
		this.displayEnergy(); //adds energy to <div> in html.
		//drawEverything();
		this.displayMap(); //creates our map string, and displays to user.

		if (this.atJewels()) {
			alert("You've found the jewels! Use them wisely!");
			this.gameOver();
		}
	},

	//edits visibility for fog of war.
	correctCoord : function(coord) {
		// sometimes X/Y can be either -1 or -2, the next two statments statment fixes this problem since we can wrap around the map and we can't have negative coord  
		if (coord == -2) { 
			//alert("WE ARE IN X-2 OR Y-2");
			return (MAX - 2);
		}
		if (coord == -1) { 
			return (MAX - 1);
		}

		if (coord == MAX) {
			return 0;
		}
		if (coord == MAX + 1) {
			//alert("WE ARE IN MAX + 1");
			return 1;
		}
		return coord;

	},
	alterFlags : function() {

		// If true, then the player can see two coords in each direction. this line will change later and will be linked to the inventory system
		let hasBinoculars = localStorage.getItem("Binocular");

		//stores the surround cells of the current hero coord (stores a 3X3 matrix of coords)
		let x = this.x_coord; let y = this.y_coord;
		let xminusone = this.correctCoord(x-1); let yminusone = this.correctCoord(y-1);
		let xplusone = this.correctCoord(x+1); let yplusone = this.correctCoord(y+1);
		let xplustwo = this.correctCoord(x+2); let yplustwo = this.correctCoord(y+2);
		let xminustwo = this.correctCoord(x-2); let yminustwo = this.correctCoord(y-2);

		//the player can see a total of 9 blocks initially, this may change depending on the posssesion of binoculars

		let MaxVisibility = 9;

		//stores the 3X3(base) matrix of surronding coords in a 1-D array
		let surroundingCellsCoord = [9];
		surroundingCellsCoord[0] = xminusone + ',' + yminusone;
		surroundingCellsCoord[1] = x + ',' + yminusone;
		surroundingCellsCoord[2] = xplusone + ',' + yminusone;

		surroundingCellsCoord[3] = xminusone + ',' + y;
		surroundingCellsCoord[4] = x + ',' + y;
		surroundingCellsCoord[5] = xplusone + ',' + y;

		surroundingCellsCoord[6] = xminusone + ',' + yplusone;
		surroundingCellsCoord[7] = x + ',' + yplusone;
		surroundingCellsCoord[8] = xplusone + ',' + yplusone;

		//if the player has binoculars, then the player will be able to see more blocks (25 total)
		//this if-statment changes the MaxVisibility variable to 25 which will be used in a for-loop later
		//also, it will store every new(non-base) x,y into the 1-D array
		if (hasBinoculars) {
			MaxVisibility = 25;

			surroundingCellsCoord[9] = xminustwo + ',' + yminustwo;
			surroundingCellsCoord[10] = xminusone + ',' + yminustwo;
			surroundingCellsCoord[11] = x + ',' + yminustwo;
			surroundingCellsCoord[12] = xplusone + ',' + yminustwo;
			surroundingCellsCoord[13] = xplustwo + ',' + yminustwo;

			surroundingCellsCoord[14] = xminustwo + ',' + yminusone;
			surroundingCellsCoord[15] = xplustwo + ',' + yminusone;

			surroundingCellsCoord[16] = xminustwo + ',' + y;
			surroundingCellsCoord[17] = xplustwo + ',' + y;

			surroundingCellsCoord[18] = xminustwo + ',' + yplusone;
			surroundingCellsCoord[19] = xplustwo + ',' + yplusone;
			
			surroundingCellsCoord[20] = xminustwo + ',' + yplustwo;
			surroundingCellsCoord[21] = xminusone + ',' + yplustwo;
			surroundingCellsCoord[22] = x + ',' + yplustwo;
			surroundingCellsCoord[23] = xplusone + ',' + yplustwo;
			surroundingCellsCoord[24] = xplustwo + ',' + yplustwo;
		}
		
		//A for loop that goes through the 1-D array, and pushes/modfies cells to the local storage
		//All the new/modfied cells that are pushed have their visibility flag value set to 1
		
		for (let i = 0; i < MaxVisibility; i++) {
			let cell = localStorage.getItem(surroundingCellsCoord[i]);

			if (cell == null) {
				//If the coord doesn't exist in local storage, then a new cell will be made and pushed to local storage

				//alert("This coord is NULL in local storage!");	
				cell = surroundingCellsCoord[i] + ",1,0,None";
				//alert("This is what will be PUSHED to local storage: " + cell);
				localStorage.setItem(surroundingCellsCoord[i], cell);
			}
			else {
				//If the coord already has a cell in local storage, then this function will only modify the visibility flag, and then push the change to local storage again
				cell = cell.split(",");
				cell[2] = 1;
				//alert("Current coord is NOT NULL in local storage (it exits)");
				//alert("This is what will be PUSHED to local storage: " + cell);
				localStorage.setItem(surroundingCellsCoord[i], cell);

			}
		}
	},

	dispLoc: function () {
		document.getElementById("loc").innerHTML = "Current Location:  " + this.x_coord + ',' + this.y_coord;
	},

	dispWhif: function () {
		document.getElementById("whif").innerHTML = "Whiffles: " + this.whiffles;
	},

	//displays cell contents to user in html page. TODO: shouldn't be in final product.
	checkLoc: function () {
		var key = this.x_coord + ',' + this.y_coord;
		let cellContents = localStorage.getItem(key);
		if (cellContents != null) {
			cellContents = cellContents.split(',');
			cellContents[2] = 1;
			localStorage.setItem(key, cellContents);
			document.getElementById("cell").innerHTML = "Cell Details: " + cellContents;

				this.addInventory();
		}
		else {
			var newCell = key + ",1,0,None";
			localStorage.setItem(key, newCell);
			document.getElementById("cell").innerHTML = "Cell Details: " + newCell;
		}
	},

addInventory : function() {
		let key = this.x_coord + ',' + this.y_coord; //should merge into another function
		let cellContents = localStorage.getItem(key);
		 cellContents = cellContents.split(',');
		 count = 0;// count makes it so you can go back and unpurchased item will be there still
		 switch (cellContents[4]){
			case 'Hatchet':
				if(this.whiffles >= 50){
					if(this.promptPurchase("Hatchet", 50)) {
						localStorage.setItem(Hatchet, ++this.invArray[0]);
						document.getElementById("Hatchet").innerHTML = '<br><br>' + this.invArray[0];
						this.whiffles -= 50; count=1;
				}
			}
				break;
			case 'Hammer':
				if(this.whiffles >= 50){
					if(this.promptPurchase("Hammer", 50)) {
						localStorage.setItem('Hammer', ++this.invArray[1]);
						document.getElementById("Hammer").innerHTML = '<br><br>' + this.invArray[1];
						this.whiffles -= 50; count=1;
					}
				}
				break;
			case 'Boat':
				if(this.whiffles >= 100){
					if(this.promptPurchase("Boat", 100)) {
						localStorage.setItem('Boat', ++this.invArray[2]);
						document.getElementById("Boat").innerHTML = '<br><br>' + this.invArray[2];
						this.whiffles -= 100; count=1;
					}
				}
				break;
			case 'Power Bar':
				if(this.whiffles >= 20){
					if(this.promptPurchase("Power Bar", 20)) {
						this.energy += 20;
						this.whiffles -= 20; count=1;
					}
				}
			case 'Pickaxe':
				if(this.whiffles >= 50){
					if(this.promptPurchase("Pickaxe", 50)) {
						localStorage.setItem('Pickaxe', ++this.invArray[3]);
						document.getElementById("Pickaxe").innerHTML = '<br><br>' + this.invArray[3];
						this.whiffles -= 50; count=1;
					}
				}
				break;
			case 'Chainsaw':
				if(this.whiffles >= 50){
					if(this.promptPurchase("Chainsaw", 50)) {
						localStorage.setItem('Chainsaw', ++this.invArray[4]);
						document.getElementById("Chainsaw").innerHTML = '<br>' + this.invArray[4];
						this.whiffles -= 50; count=1;
					}
				}
				break;
			case 'Chisel':
				if(this.whiffles >= 50){
					if(this.promptPurchase("Chisel", 50)) {
						localStorage.setItem('Chisel', ++this.invArray[5]);
						document.getElementById("Chisel").innerHTML = '<br><br><br>' + this.invArray[5];
						this.whiffles -= 50; count=1;
					}
				}
				break;
			case 'Sledge':
				if(this.whiffles >= 50){
					if(this.promptPurchase("Sledge", 50)) {
						localStorage.setItem('Sledge', ++this.invArray[6]);
						document.getElementById("Sledge").innerHTML = '<br><br><br>' + this.invArray[6];
						this.whiffles -= 50; count=1;
					}
				}
				break;
			case 'Machete':
				if(this.whiffles >= 50){
					if(this.promptPurchase("Machete", 50)) {
						localStorage.setItem('Machete', ++this.invArray[7]);
						document.getElementById("Machete").innerHTML = '<br><br><br>' + this.invArray[7];
						this.whiffles -= 50; count=1;
					}
				}
				break;
			case 'Jackhammer':
				if(this.whiffles >= 50){
					if(this.promptPurchase("Jackhammer", 50)) {
						localStorage.setItem('Jackhammer', ++this.invArray[8]);
						document.getElementById("Jackhammer").innerHTML = '<br><br><br>' + this.invArray[8];
						this.whiffles -= 50; count=1;
					}
				}
				break;
			case 'Shears':
			if(this.whiffles >= 50){
				if(this.promptPurchase("Shears", 50)) {
					localStorage.setItem('Shears', ++this.invArray[9]);
					document.getElementById("Shears").innerHTML = '<br><br>' + this.invArray[9];
					this.whiffles -= 50; count=1;
				}
			}
				break;
			case 'Binoculars':
			if(this.whiffles >= 100){//need to make this only one binoc possible
				if(this.promptPurchase("Binoculars", 100)) {
					localStorage.setItem('Binoculars', ++this.invArray[9]);
					document.getElementById("Binoculars").innerHTML = '<br><br><br>' + this.invArray[10];
					this.whiffles -= 100; count=1;
				}
			}
				break;
		 }/* end switch statement */
		if(count == 1){
			document.getElementById(cellContents[4]).className = "inventory-icon-on";
			cellContents[4] = 'None';
			localStorage.setItem(key, cellContents);
			document.getElementById("whif").innerHTML = '|Whiffles: ' + this.whiffles;
		}
	},

	promptPurchase : function(name, price) {         
		return confirm("You found a " + name + "!\n\n" + "Would you like to purchase it for " + price + " whiffles?");
	},

	atJewels: function () {
		if ((this.x_coord == this.jewels.x) && (this.y_coord == this.jewels.y))
			return true;
		return false
	},

	goNorth: function () {
		if (this.y_coord > 0) {
			--this.y_coord;
		}
		else {
			this.y_coord = MAX - 1;
		}
	},
	goWest: function () {
		if (this.x_coord > 0) {
			--this.x_coord;
		}
		else {
			this.x_coord = MAX - 1;
		}
	},
	goEast: function () {
		if (this.x_coord < MAX - 1) {
			++this.x_coord;
		}
		else {
			this.x_coord = 0;
		}
	},

	goSouth: function () {
		if (this.y_coord < MAX - 1) {
			++this.y_coord;
		}
		else {
			this.y_coord = 0;
		}
	},

	displayEnergy: function () {
		document.getElementById("energy").innerHTML = "Energy: " + this.energy;
	},
	checkEnergy: function () {
		cellContents = localStorage.getItem(this.x_coord + ',' + this.y_coord);
		if (cellContents != null) {
			var cell = cellContents.split(',');
			if ((cell[3] == 4) || (cell[3] == 5))
				this.energy = this.energy - 2;
			else
				--this.energy;
		}
		else
			--this.energy;
		if (this.energy < 1) {
			var scream = new Audio("wilhelm.mp3");
			scream.play();
			alert("You are out of energy!");
			this.gameOver();
		}
	},

	gameOver: function () {
		window.location.href = "Frupalsplash.html";
	},

	//0=meadow, 1=forest, 2=water, 3=wall, 4=bog, 5=swamp
	displayMap: function () {
		var rowSize = (2 * MAPSIZE) + 1;
		let tempMapString = "";
		for (let i = 0; i < MAX; i++) {
			for (let j = 0; j < MAX; j++) {
				let currCell = localStorage.getItem(j + ',' + i);
				if (j == this.x_coord && i == this.y_coord)
					tempMapString += 'C';
				else if (currCell != null) {
					currCell = currCell.split(",");

					if (currCell[2] == '0')
						tempMapString += 'X'
					else switch (currCell[3]) {
						case '0':
							tempMapString += 'M';
							//drawMeadow();
							break;
						case '1':
							tempMapString += 'F';
							//drawForest();
							break;
						case '2':
							tempMapString += 'w';
							//drawWater();
							break;
						case '3':
							tempMapString += 'W';
							//drawWall();
							break;
						case '4':
							tempMapString += 'B';
							//drawBog();
							break;
						case '5':
							tempMapString += 'S';
							//drawSwap();
							break;
						default:
							tempMapString += 'E'; // 'E' signifies some sort of error when checking the cell
							break;
					}
				}
				else {
					tempMapString += 'X';
				}
			}
			tempMapString += "<br>";
		}
		this.mapString = tempMapString;
		document.getElementById("map").innerHTML = this.mapString;
	},

	changeMapMode: function () {
		if (this.mapMode == 0)
			this.mapMode = 1;
		else
			this.mapMode = 0;
		this.displayMap();
	},

	//redirects us to the splash page if we didn't come from it.
	checkFrom: function () {
		if (document.referrer.includes("Frupalsplash.html") == false)
			window.location.href = "Frupalsplash.html";
	},

    checkObstacle : function()
    {
		let currCell = localStorage.getItem(this.x_coord + ',' + this.y_coord);
		if(currCell != null)
		{	
			currCell = currCell.split(',');
            switch(currCell[4])
            {
                case "Tree":
                    if(this.invArray[4] > 0) //if user has chainsaw
                    {
                        this.invArray[4]--;
                        this.energy -= 2;
                    }
                    else if(this.invArray[3] > 0) // if axe
                    {
                        this.invArray[3]--;
                        this.energy -= 5;
                    }
                    else if(this.invArray[0] > 0) // if hatchet
                    {
                        this.invArray[0]--;
                        this.energy -= 8;
                    }
                    else // no tools
                        this.energy -= 10;

                    currCell[4] = "None";
                    localStorage.setItem(this.x_coord + ',' + this.y_coord, currCell);
                    break;
                case "Boulder":
                    if(this.invArray[8] > 0)// if jackhammer
                    {
                        this.invArray[8]--;
                        this.energy -= 4;
                    }
                    else if(this.invArray[6] > 0)// if sledge hammer
                    {
                        this.invArray[6]--;
                        this.energy -= 9;
                    }
                    else if(this.invArray[1] > 0) //if hammer
                    {
                        this.invArray[1]--;
                        this.energy -= 12;
                    }
                    else if(this.invArray[5] > 0) // if chisel
                    {
                        this.invArray[5]--;
                        this.energy -= 14;
                    }
                    else // no tools
                        this.energy -= 16;

                    currCell[4] = "None";
                    localStorage.setItem(this.x_coord + ',' + this.y_coord, currCell);
                    break;
                case "Blackberry Bushes":
                    if(this.invArray[9] > 0) // if shears
                    {
                        this.invArray[9]--;
                        this.energy -= 1;
                    }
                    else if(this.invArray[7] > 0) // if machete
                    {
                        this.invArray[7]--;
                        this.energy -= 3;
                    }
                    else
                        this.energy -= 4;

                    currCell[4] = "None";
                    localStorage.setItem(this.x_coord + ',' + this.y_coord, currCell);
                    break;
                default:
                    break;
            }
        }
    },
	// Returns true if no water or water and has boat is true.
	checkWater: function (xcoord, ycoord){
		cellContents = localStorage.getItem(xcoord + ',' + ycoord);
		if (cellContents != null) {
			var cell = cellContents.split(',');
			check = localStorage.getItem('Boat');// was('Boat');
			if (cell[3] == 2){
				if (check > 0){
					return true;
				}
				else{
					alert("You encoutered water without a boat!");
					--this.energy;
					return false;
				}
				
			}
			else{
				return true;
			}

		}
	}
};
