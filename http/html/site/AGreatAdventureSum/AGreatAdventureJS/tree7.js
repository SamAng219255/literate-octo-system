function tree7(input) {//craft
	if(input=="armor") {
		receive("tree16");
	}
	else {
		if(findIn("object",false,"recipes.craft.recipes",input)) {
			var inList=eval("recipes.craft.recipes."+input+".in");
			var outList=eval("recipes.craft.recipes."+input+".out");
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
				transmit(eval(recipes.craft.operationText),"computer");
			}
			else {
				transmit("You are missing "+textList(enoughList)+".","computer");
			}
		}
		else {
			transmit("You can not craft that.","computer");
		}
	}
	shouldUpdate=true;
	receive("tree1",true);
}