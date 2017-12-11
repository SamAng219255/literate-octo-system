var scripts=["organization_and_grammar","Structures","newAGreatAdventureProgram","Creatures","treeHelp"];
var origLength=scripts.length;
for(var i=0; i<scripts.length; i++) {
	var para = document.createElement("script");
	para.setAttribute("src", "../fileStorage/in_use/aGreatAdventure/"+scripts[i]+".js");
	var element = document.getElementById("scriptHolder");
	element.appendChild(para);
}
function finishLoad() {
	for(var i=1; i<=17; i++) {
		scripts=addToArray(scripts,"tree"+i)
	}
	for(var i=origLength; i<scripts.length; i++) {
		var para = document.createElement("script");
		para.setAttribute("src", "../fileStorage/in_use/aGreatAdventure/"+scripts[i]+".js");
		var element = document.getElementById("scriptHolder");
		element.appendChild(para);
	}
}