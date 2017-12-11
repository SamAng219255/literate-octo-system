function tree6(input) {//attack
	var Method=false;
	for(var i=0; i<here().creatures.length; i++) {
		if(here().creatures[i].Name==input) {
			if(here().creatures[i].Method=="attack") {
				if(here().creatures[i].count>0) {
					Method=i;
				}
			}
		}
	}
	if(Method!==false) {
		here().creatures[Method].health-=player.attack;
		tackText="You have attacked the "+input+" for "+player.attack+" points of damage.";
		if(here().creatures[Method].health<(eval("creatures.noAI."+input+".health")/2)) {
			tackText+=" It appears badly damaged.";
		}
		transmit(tackText);
		if(here().creatures[Method].health<=0) {
			eval("map.x"+player.position.x+".y"+player.position.y+".z"+player.position.z+".creatures[Method].count--");
			var loot=eval("map.x"+player.position.x+".y"+player.position.y+".z"+player.position.z+".creatures")[Method].drops;
			for(var i=0; i<loot.length; i++) {
				eval("inventory.items."+loot[i][0]+".count+="+loot[i][1]);
			}
			transmit("You have slain the "+input+". You collect "+textList(loot)+" from it.");
		}
	}
	else {
		transmit("You can not attack that.");
	}
	shouldUpdate=true;
	receive("tree1",true);
}