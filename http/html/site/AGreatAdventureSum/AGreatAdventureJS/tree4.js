function tree4(input) {//collect
	if(findIn("array",1,eval("map.x"+player.position.x+".y"+player.position.y+".z"+player.position.z+".resources"),input)!=null 
			&& findIn("array",2,eval("map.x"+player.position.x+".y"+player.position.y+".z"+player.position.z+".resources"),input)>0) {
		if(inventory.howMany<inventory.maxSpace) {
			if(findIn("array",1,eval("map.x"+player.position.x+".y"+player.position.y+".z"+player.position.z+".resources"),input)=="none" || 
					eval("inventory.items."+findIn("array",1,eval("map.x"+player.position.x+".y"+player.position.y+".z"+player.position.z+".resources"),input)+".count>0")) {
				eval("inventory.items."+input+".count++;");
				transmit("You have collected "+textList([[input,1]])+".","computer");
			}
			else {
				transmit("You need "+textList([[findIn("array",1,
					eval("map.x"+player.position.x+".y"+player.position.y+".z"+player.position.z+".resources"),input),1]])+" to collect "+textList([[input,1]])+".");
			}
		}
		else {
			transmit("You could not collect that because you already have too many items.","computer");
		}
	}
	else {
		transmit("You can't collect that.","computer");
	}
	shouldUpdate=true;
	receive("tree1",true);
}