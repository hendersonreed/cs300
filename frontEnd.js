	//When you mouse over a pip inventory screen icon this makes the name appear.
	var ui = {
		count: 1, //used for original pip boy switch button
		inventoryMouseOver : function(item, special){
			if(!special){
				document.getElementById("status").innerHTML = item;
				document.getElementById(item).style.transform = "rotate(7deg)";
			}else{
			
				document.getElementById("status").innerHTML = item;
				document.getElementById("special").className = "on special active";
				document.getElementById(item).style.transform = "scale(1.3)";
			}
			if(special == 'clear'){
				document.getElementById("status").innerHTML = "";
				document.getElementById("special").className = "off special";
				document.getElementById(item).style.transform = "rotate(0deg)";		
			}
		},
//This shows the original, un-altered Frup-boy
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
		
		//This controls all the motion of the user interface
				//zero is mouse enter and one is mouse leave
		pipMotion : function(set){
			if(set==0){//mouse in
				if(document.getElementById("wrapper-new")){
					document.getElementById("wrapper-new").id="wrapper";
					document.getElementById("container1").className="grow2";
				}else{
					document.getElementById("wrapper-out").id="wrapper";
					document.getElementById("container1").className="grow2";
				}
			}
			if(set==1){//mouse out
				document.getElementById("wrapper").id="wrapper-out";
				document.getElementById("container1").className="grow2-hover";				
			}
		},
	};