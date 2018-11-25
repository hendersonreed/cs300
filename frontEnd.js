	//When you mouse over a pip inventory screen icon this makes the name appear.
	var ui = {
		count: 0,
		inventoryMouseOver : function(item, special){
		if(!special){
		document.getElementById("status").innerHTML = item;
		}
		if(special){
			document.getElementById("status").innerHTML = item;
			document.getElementById("special").className = "special";

			document.getElementById("item").width = 40;
		}
		if(item == 'clear'){
		document.getElementById("status").innerHTML = "";
		document.getElementById("special").className = "off special";		
		}
	},
	
	ogb : function(){
		document.getElementById("oldPip").style.zIndex="1";
		this.count += 1;
		if(this.count%2){
			document.getElementById("oldPip").style.zIndex="0";
		}
	},
	};