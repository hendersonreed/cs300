/*
	File: Frupal.html
	Authors: Henderson Hummel, James Hiebert
	Date 10/27/2018

	Purpose: display the game to user.
	Description: This is our managing javascript section, as well as the
	page source. It's exceedingly preliminary, so much of this will change.
	Also! This page is in active development, so if you're reading this 
	because the page is broken, well, that's to be expected.
*/
const MAX = 20;
const MAPSIZE = 5; //Distance from the player that tiles should be drawn
var game = {
	x_coord : 0,
	y_coord : 0,
	energy : 100,
	mapString: "",
	mapMode : 0, //0 for mini-map, 1 for full map

	jewels : {x: Math.round((Math.random() * 1000) % (MAX + 1)), y: Math.round((Math.random() * 1000) % (MAX + 1))},

	//setting up the initial cell contents div.
	go : function(direc) {
		switch(direc) {
			case 'n':
				this.goNorth();
				break;
			case 'e':
				this.goEast();
				break;
			case 'w':
				this.goWest();
				break;
			case 's':
				this.goSouth();
				break;
			default:
				this.y_coord = 0;
				this.x_coord = 0;
				break;
		}
		localStorage.setItem('x_coord', this.x_coord);
		localStorage.setItem('y_coord', this.y_coord);

		this.alterFlags();
		this.dispLoc();
		this.checkLoc();
		this.checkEnergy();
		this.displayEnergy();
		this.displayMap();
		if(this.atJewels()){
			alert("You've found the jewels! Use them wisely!");
			this.gameOver();
		}
	},

	alterFlags : function() {
		//stores the surround cells of the current hero coord (stores a 3X3 matrix of coords)

		let x = this.x_coord; let y = this.y_coord;
		let xminusone = x-1; let yminusone = y-1;
		let xplusone = x+1; let yplusone = y+1;
		//alert("xplusone is: " + xplusone);

		//This section of the code will adjust the X,Y values whenever they're out of bounds, to keep us from trying to access an out-of-bound index 

		if (xminusone < 0) {
			xminusone = MAX - 1;
			//alert("OUT OF BOUNDS");
		}
		if (xplusone > MAX - 1) {
			//alert("xplusone is OUT OF BOUNDS");
			xplusone = 0;
		}
		if (yminusone < 0) {
			yminusone = MAX - 1;
			//alert("OUT OF BOUNDS, YMINUSONE IS: " + yminusone );
		}
		if (yplusone > MAX - 1) {
			yplusone = 0;
			//alert("OUT OF BOUNDS, YMINUSONE IS: " + yminusone );
		}

		//stores the 3X3 matrix of surronding coords in a 1-D array
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

		//A for loop that goes through the 1-D array, and pushes/modfies cells to the local storage
		//All the new/modfies cells that are pushed have their visibility flag value set to 1

		for (let i = 0; i < 9; i++) {
			//alert(surroundingCellsCoord[i]);

			let cell = localStorage.getItem(surroundingCellsCoord[i]);
			if (cell == null) {
				//If the coord doesn't exist in local storage, then a new cell will be made and pushed to local storage

				//alert("This coord is NULL in local storage!");	
				cell = surroundingCellsCoord[i]+",1,0,None";
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

	dispLoc : function() {
		document.getElementById("loc").innerHTML = "Current Location:  " + this.x_coord + ',' + this.y_coord;
	},

	checkLoc : function() {
		var key = this.x_coord + ',' + this.y_coord;
		var cellContents = localStorage.getItem(key);
		if(cellContents != null) {
			cellContents = cellContents.split(',');
			cellContents[2] = 1;
			localStorage.setItem(key, cellContents);
			document.getElementById("cell").innerHTML = "Cell Details: " + cellContents;
			//if(this.x_coord > 0 && this.y_coord > 0){

			//}
		}
		else {
			var newCell = key + ",1,0,None";
			localStorage.setItem(key, newCell);
			document.getElementById("cell").innerHTML = "Cell Details: " + newCell;
		}
	},

	atJewels : function() {
		if((this.x_coord == this.jewels.x) && (this.y_coord == this.jewels.y))
			return true;
		return false
	},

	goNorth : function() {
		if(this.y_coord > 0) {
			--this.y_coord;
		}
		else {
			this.y_coord = MAX - 1;
		}
	},
	goWest : function() {
		if(this.x_coord > 0) {
			--this.x_coord;
		}
		else {
			this.x_coord = MAX - 1;
		}
	},
	goEast : function() {
		if(this.x_coord < MAX - 1) {
			++this.x_coord;
		}
		else {
			this.x_coord = 0;
		}
	},

	goSouth : function() {
		if(this.y_coord < MAX - 1) {
			++this.y_coord;
		}
		else {
			this.y_coord = 0;
		}
	},

	displayEnergy : function() {
		document.getElementById("energy").innerHTML = "Energy: " + this.energy;
	},
	checkEnergy : function() {
		cellContents = localStorage.getItem(this.x_coord + ',' + this.y_coord);
		if(cellContents != null)
		{	
			var cell = cellContents.split(',');
			if((cell[3] == 4) || (cell[3] == 5))
				this.energy = this.energy-2;
			else
				--this.energy;
		}
		else
			--this.energy;
		if(this.energy < 1) {
			alert("You are out of energy!");
			this.gameOver();
		}
	},

	gameOver : function() {
		window.location.href ="Frupalsplash.html";
	},

	//0=meadow, 1=forest, 2=water, 3=wall, 4=bog, 5=swamp
	displayMap : function()
	{
		var rowSize = (2*MAPSIZE)+1;
		let tempMapString = "";
			for(let i = 0; i < MAX; i++)
			{
				for(let j = 0; j < MAX; j++ )
				{
					let currCell = localStorage.getItem(j + ',' + i);
					if( j == this.x_coord && i == this.y_coord)
						tempMapString += 'C';
					else if(currCell != null)
					{
						currCell = currCell.split(",");

						if(currCell[2] == '0')
							tempMapString += 'X'
						else switch(currCell[3])
						{
							case '0':
								tempMapString += 'M';
								break;
							case '1':
								tempMapString += 'F';
								break;
							case '2':
								tempMapString += 'w';
								break;
							case '3':
								tempMapString += 'W';
								break;
							case '4':
								tempMapString += 'B';
								break;
							case '5':
								tempMapString += 'S';
								break;
							default:
								tempMapString += 'E'; // 'E' signifies some sort of error when checking the cell
								break;

						}
					}
					else
					{
						tempMapString += 'X';
					}
				}
				tempMapString += "<br>";
			}
		this.mapString = tempMapString;
		document.getElementById("map").innerHTML = this.mapString;
		
	},
	changeMapMode : function()
	{
		if(this.mapMode == 0)
			this.mapMode = 1;
		else
			this.mapMode = 0;
		this.displayMap();
	},
	checkFrom : function()
	{
		if(document.referrer.includes("Frupalsplash.html") == false)
			window.location.href = "Frupalsplash.html";
	}

};
