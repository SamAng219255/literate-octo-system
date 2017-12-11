function tree5(input) {//hunt
	var Method=false;
	for(var i=0; i<here().creatures.length; i++) {
		if(here().creatures[i].Name==input) {
			if(here().creatures[i].Method=="hunt") {
				if(here().creatures[i].count>0) {
					Method=i;
				}
			}
		}
	}
	if(Method!==false) {
		if(inventory.items.bow.count>0 && inventory.items.arrow.count>0) {
			eval("map.x"+player.position.x+".y"+player.position.y+".z"+player.position.z+".creatures[Method].count--");
			var loot=eval("map.x"+player.position.x+".y"+player.position.y+".z"+player.position.z+".creatures")[Method].drops;
			for(var i=0; i<loot.length; i++) {
				eval("inventory.items."+loot[i][0]+".count+="+loot[i][1]);
			}
			transmit("You have killed a "+input+". You collect "+textList(loot)+" from it.","computer");
		}
		else {
			transmit("You have nothing to hunt with.","computer");
		}
	}
	else {
		transmit("You can not hunt that.","computer");
	}
	shouldUpdate=true;
	receive("tree1",true);
}