function tree1(input) {//root
	if(shouldUpdate) {
		update();
	}
	if(player.health>0) {
		if(findIn("object",false,"actions",input)) {
			if(eval("actions."+input+".input")) {
				eval("receive(\""+eval("actions."+input+".function")+"\",false)");
			}
			else {
				eval(eval("actions."+input+".function")+"()");
			}
		}
		else if(input=="END") {
			End();
		}
		else if(input=="TEXT") {
			transceive(baseText(),"tree1")
		}
		else {
			transmit("Sorry, we don't currently have the ability to understand your input. Try again with an exact string.","computer");
			receive("tree1",true);
		}
		console.log("\"tree1\" done");
	}
	else {
		transmit("Your health is "+player.health+".");
		transmit("You have died.");
		End();
	}
	function update() {
		player.attackMod=0;
		player.armorMod=0;
		if(inventory.items.sword.count>=1) {
			player.attackMod+=1
		}
		player.armorMod+=eval("armours."+player.equipment.armor+".armorBonus");
		player.attack=(player.baseAttack+player.attackMod);
		player.armor=(player.baseArmor+player.armorMod);
		generateStuff("createAllow","actionList");
		for(var prop in allow) {
			eval(
				"for(var i=0; i<eval(\"map.x\"+player.position.x+\".y\"+player.position.y+\".z\"+player.position.z+\".structures\").length; i++) { "+
					"if(places,eval(\"map.x\"+player.position.x+\".y\"+player.position.y+\".z\"+player.position.z+\".structures[i].allows\")==\""+prop+"\") { "+
						"allow."+prop+"=true; "+
					"} "+
				"}"
			);
		}
		if(player.poison>0) {
			player.health--;
			player.poison--;
			transmit("You have taken one point of poison damage.","info");
		}
		inventory.howMany=0;
		for(var prop in inventory.items) {
			if(eval("inventory.items."+prop+".countsTowardSpace")) {
				inventory.howMany+=eval("inventory.items."+prop+".count");
			}
		}
		generateAnimals();
		gameEvent("meteoroid");
		animalAttack();
		places=[];
		for(var i=0; i<eval("map.x"+player.position.x+".y"+player.position.y+".z"+player.position.z+".structures").length; i++) {
			places=addToArray(places,[eval("map.x"+player.position.x+".y"+player.position.y+".z"+player.position.z+".structures[i].Name"),1]);
		}
		shouldUpdate=false;
	}
}
