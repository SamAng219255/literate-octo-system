function tree17(input) {//help
	actionList=[];
	for(var prop in actions) {
		actionList=addToArray(actionList,prop);
	}
	helperTextList=[
	"INVENTORY (no arguments) | Lists your inventory.",
	"HEALTH (no arguments) | Displays your health.",
	"collect <thingToBeCollected> | Collects \"thingToBeCollected\" if it is there.",
	"hunt <target> | Hunts \"target\" if it is there and you have something to hunt with.",
	"attack <target> | Attacks \"target\" if it is there.",
	"craft <thingToBeCrafted> | Crafts \"thingToBeCrafted\" if you have the materials.",
	"build <structure> | Builds \"structure\" if you have the materials.",
	"cook <thingToBeCooked> | Cooks \"thingToBeCooked\" if you have it and a place cook it.",
	"sleep (no arguments) | Sleeps if there is somewhere to sleep.",
	"eat <thingToBeEaten> | Eats \"thingToBeEaten\" if you have it.",
	"equip <equipment> | Equips \"equipment\" if you have it replacing anything you are currently wearing in that slot.",
	"smelt <thingToBeSmelted> | Smelts \"thingToBeSmelted\" if you have and a place to smelt it.",
	"eject <item> | Gets rid of \"item\" if you have it.",
	"move <direction> | Moves you towards \"direction\" if you can go there.",
	"HELP <action> | Displays help for \"action\"."
	];
	if(input=="list") {
		transmit(line,"info");
		for(var i=0; i<helperTextList.length; i++) {
			transmit(helperTextList[i],"info");
		}
		transmit(line,"info");
	}
	else if(checkForMatches(input,actionList)>0) {
		transmit(helperTextList[findIn("array",false,actionList,input)],"info");
	}
	else {
		transmit("The \""+input+"\" command does not exist.","computer")
	}
	receive("tree1",true);
}
line="";
for(var i=0; i<150; i++) {
	line+="-";
}