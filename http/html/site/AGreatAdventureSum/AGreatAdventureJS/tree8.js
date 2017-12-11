function tree8(input) {//build
	if(findIn("object",false,"structures.built",input)) {
		var inList=eval("structures.built."+input+".requires");
		var enough=true;
		var enoughList=[];
		for(var i=0; i<inList.length; i++) {
			if(eval("inventory.items."+inList[i][0]).count<inList[i][1]) {
				enough=false;
				enoughList=addToArray(enoughList,[inList[i][0],inList[i][1]-eval("inventory.items."+inList[i][0]).count]);
			}
		}
		if(enough) {
			eval("map.x"+player.position.x+".y"+player.position.y+".z"+player.position.z+".structures="+
				"addToArray(map.x"+player.position.x+".y"+player.position.y+".z"+player.position.z+".structures,structures.built."+input+");");
			for(var i=0; i<inList.length; i++) {
				eval("inventory.items."+inList[i][0]).count-=inList[i][1];
			}
			textInList=textList(inList);
			transmit("You have built a "+input+" using "+textInList+".","computer");
		}
		else {
			transmit("You are missing "+textList(enoughList)+".","computer");
		}
	}
	else {
		transmit("You can not build that.","computer");
	}
	shouldUpdate=true;
	receive("tree1",true);
}