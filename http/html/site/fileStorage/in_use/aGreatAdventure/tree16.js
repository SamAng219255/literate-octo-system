function tree16(input) {//armor
	var inList=eval("armours."+input+".materials");
	var outList=[[input+" armor",1]];
	if(findIn("object",false,"armours",input)) {
		var enough=true;
		var enoughList=[];
		for(var i=0; i<inList.length; i++) {
			if(eval("inventory.items."+inList[i][0]).count<inList[i][1]) {
			enough=false;
			enoughList=addToArray(enoughList,[inList[i][0],inList[i][1]-eval("inventory.items."+inList[i][0]).count]);
			}
		}
		if(enough) {
			if(eval("window.inventory.items."+input+"Armor")==undefined) {
				createNewObject([input+"Armor",true,false]);
				eval("inventory.items."+input+"Armor.armorBonus="+eval("armours."+input+".armorBonus"));

			}
			eval("inventory.items."+input+"Armor.count++");
			for(var i=0; i<inList.length; i++) {
				eval("inventory.items."+inList[i][0]).count-=inList[i][1];
			}
			textInList=textList(inList);
			textOutList=textList(outList);
			transmit(eval(recipes.craft.operationText),"computer");
		}
		else {
			transmit("You are missing "+textList(enoughList)+".","computer");
		}
	}
	else {
		transmit("That is not a valid armor type.","computer");
	}
	shouldUpdate=true;
	receive("tree1",true);
}
var armors=[
["none",	0,	"[]"],
["leather",	1,	"[[\"leather\",5]]"],
["iron",	3,	"[[\"iron\",5]]"]
];
armours={};
function createArmor(thing) {
	eval("armours."+thing[0]+"={Name:\""+thing[0]+"\",armorBonus:"+thing[1]+",materials:"+thing[2]+"}");
}
generateStuff("createArmor","armors");
generateValidInputs("armors");