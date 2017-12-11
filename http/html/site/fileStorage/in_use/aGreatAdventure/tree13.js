function tree13(input) {//smelt
	if(allow.smelt) {
		var inList=eval("recipes.smelt.recipes."+input+".in");
		var outList=eval("recipes.smelt.recipes."+input+".out");
		if(findIn("object",false,"recipes.smelt.recipes",input)) {
			var enough=true;
			var enoughList=[];
			for(var i=0; i<inList.length; i++) {
				if(eval("inventory.items."+inList[i][0]).count<inList[i][1]) {
					enough=false;
					enoughList=addToArray(enoughList,[inList[i][0],inList[i][1]-eval("inventory.items."+inList[i][0]).count]);
				}
			}
			if(enough) {
				for(var i=0; i<outList.length; i++) {
					eval("inventory.items."+outList[i][0]).count+=outList[i][1];
				}
				for(var i=0; i<inList.length; i++) {
					eval("inventory.items."+inList[i][0]).count-=inList[i][1];
				}
				textInList=textList(inList);
				textOutList=textList(outList);
				transmit(eval(recipes.smelt.operationText),"computer");
			}
			else {
				transmit("You are missing "+textList(enoughList)+".","computer");
			}
		}
		else {
			transmit("You can not smelt that.","computer");
		}
	}
	else {
		transmit("There is nowhere to smelt.","computer");
	}
	shouldUpdate=true;
	receive("tree1",true);
}