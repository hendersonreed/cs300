	//When you mouse over a pip inventory screen icon this makes the name appear.
	var ui = {
		count: 1, //used for original pip boy switch button
		inventoryMouseOver : function(item, special){
			if(!special){
				document.getElementById("status").innerHTML = item;
				document.getElementById(item).style.transform = "rotate(7deg)";
			}else{
			if(item == 'Chainsaw'){
				document.getElementById("ChainsawOuter").style.transform = "scale(1.3)";
				document.getElementById("status").innerHTML = item;
				document.getElementById("special").className = "on special active";
			}else{
				document.getElementById("status").innerHTML = item;
				document.getElementById("special").className = "on special active";
				document.getElementById(item).style.transform = "scale(1.3)";
			}
			}
			if(special == 'clear'){
				document.getElementById("status").innerHTML = "";
				document.getElementById("special").className = "off special";
				document.getElementById(item).style.transform = "rotate(0deg)";	
				document.getElementById("ChainsawOuter").style.transform = "scale(1)";		
			}
		},
	
		ogb : function(leave){
				document.getElementById("oldPip").style.zIndex="1";
			this.count += 1;
			document.getElementById("container1").className="grow2-hover";
			if(this.count%2){
				document.getElementById("oldPip").style.zIndex="0";
			}
			if(leave==1){
				document.getElementById("container1").className="grow2";
				document.getElementById("oldPip").style.zIndex="0";
			}
		},
	};