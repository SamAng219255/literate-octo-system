function tree10() {//sleep
	for(var i=0; i<eval("map.x"+player.position.x+".y"+player.position.y+".z"+player.position.z+".structures").length; i++) {
		if(places,eval("map.x"+player.position.x+".y"+player.position.y+".z"+player.position.z+".structures[i].allows")=="sleep") {
			allow.sleep=true;
		}
	}
	var poisonCured=false;
	healed=0;
	if(allow.sleep) {
		sleepText="You have slept";
		if(player.poison>0) {
			player.poison=0;
			poisonCured=true;
		}
		if(player.health<20) {
			if(player.health<15) {
				player.health+=5;
				healed=5;
			}
			else {
				healed=(20-player.health);
				player.health=20;
			}
		}
		if(healed>0) {
			sleepText+=" restoring "+healed+" points of health";
		}
		if(healed>0 && poisonCured) {
			sleepText+=" and";
		}
		if(poisonCured) {
			sleepText+=" removing your poison";
		}
		sleepText+=".";
		if(healed!=0) {
			sleepText+=" Your health is now "+player.health+".";
		}
		transmit(sleepText,"computer")
	}
	else {
		transmit("There is nowhere to sleep.","computer");
	}
	shouldUpdate=true;
	receive("tree1",true)
}