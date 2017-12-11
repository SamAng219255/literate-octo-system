function tree11(input) {//eat
	if(findIn("object",false,"inventory.items",input) && (eval("inventory.items."+input+".edible")!=false)) {
		if(eval("inventory.items."+input+".count")>0) {
			eval("inventory.items."+input+".count--");
			healed=0;
			if(player.health<20) {
				if(player.health<(20-eval("inventory.items."+input+".edible"))) {
					player.health+=eval("inventory.items."+input+".edible");
					healed=eval("inventory.items."+input+".edible");
				}
				else {
					healed=(20-player.health);
					player.health=20;
				}
			}
			var eatText="You have eaten "+input;
			if(healed>0) {
				eatText+=", giving you "+healed+" points of health. Your health is now "+player.health;
			}
			eatText+=".";
			transmit(eatText,"info");
		}
		else {
			transmit("You don't have that.");
		}
	}
	else {
		transmit("You can't eat that.","computer");
	}
	shouldUpdate=true;
	receive("tree1",true);
}