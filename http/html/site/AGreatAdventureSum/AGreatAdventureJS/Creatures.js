function animalIntro() {
	for(var prop1 in map) {
		for(var prop2 in eval("map."+prop1)) {
			for(var prop3 in eval("map."+prop1+"."+prop2)) {
				eval("map."+prop1+"."+prop2+"."+prop3+".creatures=[]");
				for(var prop in creatures.noAI) {
					if(eval("creatures.noAI."+prop+".enviroment")==eval("map."+prop1+"."+prop2+"."+prop3+".Name")) {
						eval("map."+prop1+"."+prop2+"."+prop3+".creatures="+
							"addToArray(eval(\"map."+prop1+"."+prop2+"."+prop3+".creatures\"),eval(\"creatures.noAI."+prop+"\"))");
					}
				}
			}
		}
	}
}
function generateAnimals() {
	for(var prop1 in map) {
		for(var prop2 in eval("map."+prop1)) {
			for(var prop3 in eval("map."+prop1+"."+prop2)) {
				for(var i=0; i<eval("map."+prop1+"."+prop2+"."+prop3+".creatures").length; i++) {
					if((parseInt(2*Math.random()*eval("map."+prop1+"."+prop2+"."+prop3+".creatures[i].chance"))+1)==1) {
						eval("map."+prop1+"."+prop2+"."+prop3+".creatures[i].count+=parseInt(Math.random()*(eval(\"map."+prop1+"."+prop2+"."+prop3+".creatures\")[i].max+1))");
						if(eval("map."+prop1+"."+prop2+"."+prop3+".creatures")[i].count>eval("map."+prop1+"."+prop2+"."+prop3+".creatures")[i].max) {
							eval("map."+prop1+"."+prop2+"."+prop3+".creatures[i].count=eval(\"map."+prop1+"."+prop2+"."+prop3+".creatures\")[i].max");
						}
					}
				}
			}
		}
	}
}
function animalAttack() {
	for(var i=0; i<eval("map.x"+player.position.x+".y"+player.position.y+".z"+player.position.z+".creatures").length; i++) {
		if(eval("map.x"+player.position.x+".y"+player.position.y+".z"+player.position.z+".creatures")[i].count>0) {
			if(eval("map.x"+player.position.x+".y"+player.position.y+".z"+player.position.z+".creatures")[i].attack>0) {
				var stuffThings="The ";
				stuffThings+=eval("map.x"+player.position.x+".y"+player.position.y+".z"+player.position.z+".creatures")[i].Name;
				stuffThings+=" attacks you for ";
				stuffThings+=eval("map.x"+player.position.x+".y"+player.position.y+".z"+player.position.z+".creatures")[i].attack;
				stuffThings+=" points of damage."
				if(player.armor>0) {
					stuffThings+=" Your armor has blocked ";
					stuffThings+=player.armor;
					stuffThings+=" points of damage.";
					stuffThings+=" You take ";
					if((eval("map.x"+player.position.x+".y"+player.position.y+".z"+player.position.z+".creatures")[i].attack-player.armor)>=0) {
						stuffThings+=(eval("map.x"+player.position.x+".y"+player.position.y+".z"+player.position.z+".creatures")[i].attack-player.armor);
					}
					else {
						stuffThings+=0;
					}
					stuffThings+=" points of damage."
				}
				if((eval("map.x"+player.position.x+".y"+player.position.y+".z"+player.position.z+".creatures")[i].attack-player.armor)>=0) {
					player.health-=(eval("map.x"+player.position.x+".y"+player.position.y+".z"+player.position.z+".creatures")[i].attack-player.armor);
				}
				else {
					player.health-=eval("map.x"+player.position.x+".y"+player.position.y+".z"+player.position.z+".creatures")[i].attack;
				}
				stuffThings+=" Your health is now ";
				stuffThings+=player.health;
				stuffThings+=".";
				if(here().creatures[i].special=="poison") {
					stuffThings+=" You have also been poisoned."
					if(player.poison<=0) {
						player.poison=5;
					}
					else if(player.poison>0) {
						player.poison+=1;
					}
				}
				transmit(stuffThings,"info");
			}
		}
	}
}