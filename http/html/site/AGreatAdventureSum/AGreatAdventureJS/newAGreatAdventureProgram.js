numOfIntervals=0;
inventory={maxSpace:42,howMany:0,items:{}};
creatures={};
terrain={};
actions={};
recipes={};
structures={};
gameEvents={};
validInputs=[];
mapSize=[1,5];
segment=0;
allow={};
gameActive=false;
player={maxHealth:20,health:20,poison:0,baseAttack:1,attackMod:0,attack:1,baseArmor:0,armorMod:0,armor:0,
	equipment:{armor:"none",ring1:"none",ring2:"none",amulet:"none",special:[]},position:{x:0,y:0,z:0}};
function createNewObject(thing) {
	eval("inventory.items."+thing[0]+"={Name:\""+thing[0]+"\",count:0,countsTowardSpace:"+thing[1]+",edible:"+thing[2]+",data:"+thing[3]+"}");
}
creatures.noAI={};
function createNewCreature(thing) {
	eval("creatures."+thing[1]+"."+thing[0]+"={Name:\""+thing[0]+"\",count:0,health:"+thing[2]+",attack:"+thing[3]+",Method:"+thing[4]+
		",enviroment:"+thing[5]+",chance:"+thing[6]+",max:"+thing[7]+",special:"+thing[8]+",drops:"+thing[9]+"}");
}
function createNewTerrain(thing) {
	eval("terrain."+thing[0]+"={Name:\""+thing[0]+"\",resources:"+thing[1]+"}");
}
function createNewAction(thing) {
	eval("actions."+thing[0]+"={Name:\""+thing[0]+"\",function:\"tree"+thing[1]+"\",input:"+thing[2]+"}");
}
function createNewRecipeType(thing) {
	eval("recipes."+thing[0]+"={Name:\""+thing[0]+"\",recipes:{},operationText:"+thing[1]+",mode:"+thing[2]+",fuel:"+thing[3]+"}");
}
function createNewRecipe(thing) {
	eval("recipes."+ thing[1] +".recipes."+thing[0]+"={Name:\""+thing[0]+"\",in:"+thing[2]+",out:"+thing[3]+"}");
}
function createNewStructureType(thing) {
	eval("structures."+thing[0]+"={Name:\""+thing[0]+"\"}");
}
function createNewStructure(thing) {
	eval("structures."+ thing[1] +"."+thing[0]+"={Name:\""+thing[0]+"\",allows:\""+thing[2]+"\",requires:"+thing[3]+",allowed:"+thing[4]+
		",continueAllowed:"+thing[5]+"}");
}
function createNewEvent(thing) {
	eval("gameEvents."+thing[0]+"={Name:\""+thing[0]+"\",Chance:"+thing[2]+",eventFunction:\""+thing[3]+"\",Type:\""+thing[1]+"\",allowed:"+thing[4]+"}");
}
function createAllow(thing) {
	eval("allow."+thing[0]+"="+thing[3]);
}
objectList=[
["hardRock",	true,	false],
["rock",		true,	false],
["sharpRock",	true,	false],
["cord",		true,	false],
["longGrass",	true,	false],
["axe",			true,	false],
["log",			true,	false],
["stick",		true,	false],
["bow",			true,	false],
["arrow",		false,	false],
["sword",		true,	false],
["hide",		true,	false],
["leather",		true,	false],
["meat",		true,	2],
["cookedMeat",	true,	4],
["meteor",		true,	false],
["charcoal",	true,	false],
["iron",		true,	false]
];
creatureList=[
["deer",		"noAI",1,false,"\"hunt\"","\"forest\"",4,2,false,"[[\"meat\",1],[\"hide\",1]]"],
["bear",		"noAI",5,3,"\"attack\"","\"forest\"",30,1,false,"[[\"hide\",2]]"],
["snake",		"noAI",1,1,"\"attack\"","\"desert\"",15,1,false,"[]"],
["venomousSnake","noAI",1,1,"\"attack\"","\"desert\"",20,1,"\"poison\"","[]"]
];
terrainList=[
["ocean",	"[]"],
["desert",	"[]"],
["plains",	"[[\"longGrass\",\"none\",Infinity]]"],
["rocky",	"[[\"rock\",\"none\",Infinity],[\"hardRock\",\"none\",Infinity]]"],
["forest",	"[[\"log\",\"axe\",Infinity],[\"stick\",\"none\",Infinity]]"]
];
actionList=[
["INVENTORY",2,	false,	true],
["HEALTH"	,3,	false,	true],
["collect"	,4,	true,	true],
["hunt"		,5,	true,	true],
["attack"	,6,	true,	true],
["craft"	,7,	true,	true],
["build"	,8,	true,	true],
["cook"		,9,	true,	false],
["sleep"	,10,false,	false],
["eat"		,11,true,	true],
["equip"	,12,true,	true],
["smelt"	,13,true,	false],
["eject"	,14,true,	true],
["move"		,15,true,	true],
["HELP"		,17,true,	true]
];
recipeTypeList=[
["craft","\"\\\"You have used \\\"+textInList+\\\" to make \\\"+textOutList+\\\".\\\"\"",1,false],
["smelt","\"\\\"You have smelted \\\"+textInList+\\\" into \\\"+textOutList+\\\".\\\"\"",2,"\"charcoal\""],
["cook","\"\\\"You have cooked \\\"+textInList+\\\" making \\\"+textOutList+\\\".\\\"\"",2,false]
];
recipeList=[
["cord",	"craft",	"[[\"longGrass\",1]]","[[\"cord\",1]]"],
["axe", 	"craft",	"[[\"stick\",1],[\"cord\",1],[\"sharpRock\",1]]","[[\"axe\",1]]"],
["sharpRock","craft",	"[[\"rock\",1],[\"hardRock\",1]]","[[\"sharpRock\",1]]"],
["bow", 	"craft",	"[[\"stick\",1],[\"cord\",1]]","[[\"bow\",1]]"],
["arrow",	"craft",	"[[\"sharpRock\",1],[\"stick\",1]]","[[\"arrow\",3]]"],
["leather",	"craft",	"[[\"hide\",2]]","[[\"leather\",2]]"],
["meteor",	"smelt",	"[[\"meteor\",1]]","[[\"iron\",3]]"],
["meat",	"cook", 	"[[\"meat\",1]]","[[\"cookedMeat\",1]]"],
["log", 	"cook", 	"[[\"log\",1]]","[[\"charcoal\",5]]"]
];
additionalInputs=[
["END"],
["north"],
["south"],
["west"],
["east"],
["TEXT"],
["list"]
];
structureTypeList=[
["built"],
["natural"]
];
structureList=[
["logCabin",	"built",	"sleep",	"[[\"log\",3]]",										false,	false],
["campFire",	"built",	"cook",		"[[\"stick\",3],[\"longGrass\",1],[\"hardRock\",2]]",	false,	false],
["forge",		"built",	"smelt",	"[[\"rock\",5]]",										false,	false],
["ruins",		"natural",	"search",	0.12,													false,	false],
["meteorite",	"natural",	"pick_up",	0.05,													true,	false]
];
eventList=[
["meteoroid",		"natural",	0.02,	"meteoroid()",	true]
];
function generateStuff(generator,stuffToGenerateFrom) {
	eval(
		"for(var i=0;i<"+stuffToGenerateFrom+".length;i++) {"+generator+"("+stuffToGenerateFrom+"[i])}")
} 
generateStuff("createNewObject","objectList");
generateStuff("createNewCreature","creatureList");
generateStuff("createNewTerrain","terrainList");
generateStuff("createNewAction","actionList");
generateStuff("createNewRecipeType","recipeTypeList");
generateStuff("createNewRecipe","recipeList");
generateStuff("createNewStructureType","structureTypeList");
generateStuff("createNewStructure","structureList");
generateStuff("createNewEvent","eventList");
generateStuff("createAllow","actionList");
function generateValidInputs(list) {
	eval(
		"for(var i = 0; i<"+list+".length; i++) { "+
			"validInputs.push("+list+"[i][0]) "+
		"} "
	);
}
generateValidInputs("objectList");
generateValidInputs("creatureList");
generateValidInputs("terrainList");
generateValidInputs("actionList");
generateValidInputs("recipeTypeList");
generateValidInputs("recipeList");
generateValidInputs("additionalInputs");
generateValidInputs("structureList");
generateValidInputs("eventList");
function fill() {
	for(var prop in inventory.items) {
		eval("inventory.items."+prop+".count=10");
	}
}
function createMap(size) {
	map={};
	for(var i=1; i<=size; i++) {
		eval("map.x"+i+"={};");
	}
	for(var i=1; i<=size; i++) {
		for(var j=1; j<=size; j++) {
			if(j<(size/2)) {
				eval("map.x"+i+".y"+(j+100)+"={};");
			} else {
				eval("map.x"+i+".y"+(j-parseInt(size/2)-1)+"={};");
			};
		}
	}
	for(var i=1; i<=size; i++) {
		for(var j=1; j<=size; j++) {
			for(var k=1; k<=size; k++) {
				if(j<(size/2)) {
					eval("map.x"+i+".y"+(j+100)+".z"+k+"={};");
				} else {
					eval("map.x"+i+".y"+(j-parseInt(size/2)-1)+".z"+k+"={};");
				};
			}
		}
	}
}
function fillMap(size) {
	for(var i=1;i<=size;i++) {
		for(var j=1;j<=size;j++) {
			eval("map.x"+i+".y0.z"+j+"=randElem(terrain)");
			eval("map.x"+i+".y0.z"+j+".structures=[]");
		}
	}
}
function placeMe(size) {
	player.position.y=0;
	player.position.x=parseInt(Math.random()*size+1);
	player.position.z=parseInt(Math.random()*size+1);
}
turn=0;
inputTest=false;
function receive(action,first) {
	if(first==true || totalIn.split(" ")[segment]==undefined) {
		//console.log("option1");
		totalIn="";
		//console.log(segment+" -> \"0\"");
		segment=0;
		turn++;
		numOfIntervals++;
		waitTime=0;
		function stuff() {
			if(inputTest==true) {
				clearInterval(repeater);
				inputTest=false;
				totalIn=document.getElementById("inputBox").value;
				document.getElementById("inputBox").value="";
				if(checkIfLegal(totalIn)) {
					var input=totalIn.split(" ")[segment];/*"console.log(\"segment checked:\"+segment+\" output:\"+totalIn.split(\" \")[segment]); "+*/
					if(checkIfValid(input)) {
						transmit(totalIn,"player"); window[action](input);
					}
					else {
						transmit("Sorry, we don't currently have the ability to understand your input. Try again with an exact string.","computer");
						receive("tree1",true)
					}
				}
				else {alert("Warning: Illegal string! Game ending. Sorry for the Inconvenience."); End();}
			}
			else {
				waitTime++;
				if(waitTime>=5) {
					waitTime=0;
					console.log(action+" Waiting for response... "+turn);
				}
			}
		}
			var repeater = setInterval(function() {stuff()},1000)
	} else {
		segment++;
		/*console.log((segment-1)+" -> "+segment);
		console.log("option2");*/
		if(checkIfLegal(totalIn)) {
			var input=totalIn.split(" ")[segment];/*"console.log(\"segment checked:\"+segment+\" output:\"+totalIn.split(\" \")[segment]); "+*/
			if(checkIfValid(input)) {
				window[action](input);
			}
			else {
				transmit("Sorry, we don't currently have the ability to understand your input. Try again with an exact string.","computer");
				receive("tree1",true);
			}
		}
		else {
			alert("Warning: Illegal string! Game ending. Sorry for the Inconvenience.");
			End();
		}
	}
}
function checkIfValid(input) {
	valid = false;
	for(var i = 0; i<validInputs.length; i++) {
		if(validInputs[i]==input) {
			valid=true;
		}
	}
	return valid;
}
function checkIfLegal(input) {
	legal = true;
	temp = input.split("");
	for(var i = 0; i<temp.length; i++) {
		if(input[i]=="\"") { legal = false; }
		if(input[i]=="\\") { legal = false; }
	}
	return legal;
}
function transmit(message,type) {
	//alert(message);
	var para = document.createElement("p");
	para.setAttribute("class", "text");
	var color;
	if(type=="info") {
		color="#444444";
	}
	else if(type=="computer") {
		color="black";
	}
	else if(type=="player") {
		color="blue";
	}
	para.setAttribute("style","color:"+color)
	var node = document.createTextNode(message);
	para.appendChild(node);
	var element = document.getElementById("forText");
	element.appendChild(para);
	element.scrollTop = element.scrollHeight;

}
function transceive(message,action) {
	transmit(message,"computer");
	return receive(action,true);
}
function inputHalt() {
	if(gameActive) {
		inputTest=true;
	}
	else if(document.getElementById("inputBox").value=="Start") {
		game();
	}
}
function clearText() {
	var paras = document.getElementsByClassName("text");
	while(paras[0]) {
		paras[0].parentNode.removeChild(paras[0]);
	}
}
function baseText() {
	var texts="";
	texts+="You are in a "+eval("map.x"+player.position.x+".y"+player.position.y+".z"+player.position.z+".Name")+" biome. ";
	var stuffThings=[];
	for(var i=0; i<eval("map.x"+player.position.x+".y"+player.position.y+".z"+player.position.z+".structures").length; i++) {
		stuffThings.push([eval("map.x"+player.position.x+".y"+player.position.y+".z"+player.position.z+".structures[i].Name"),1]);
	}
	for(var i=0; i<eval("map.x"+player.position.x+".y"+player.position.y+".z"+player.position.z+".creatures").length; i++) {
		if(eval("map.x"+player.position.x+".y"+player.position.y+".z"+player.position.z+".creatures")[i].count>0) {
			stuffThings.push([eval("map.x"+player.position.x+".y"+player.position.y+".z"+player.position.z+".creatures[i].Name"),1]);
		}
	}
	for(var i=0; i<here().structures.length; i++) {
		if(here().resources[i][0]=="meteor") {
			stuffThings.push(["meteorite",1]);
		}
	}
	texts+="There is "+textList(stuffThings)+" here. ";
	texts+="What would you like to do?"
	return texts
}
function game() {
	if(!gameActive) {
		shouldUpdate=true;
		gameActive=true;
		player.health=20;
		clearText();
		transmit("Welcome to \"A Great Adventure\"!","info");
		transmit("If this this is your first time playing, please type \"HELP list\" into the input box or read the help page.","info");
		testmode=false;
		createMap(mapSize[1]);
		fillMap(mapSize[1]);
		animalIntro();
		generateStructures();
		placeMe(mapSize[1]);
		transceive("You have awoken in an unknown world. "+
			"You don't remember anything but a faint image of four glowing stones of different colors sitting in a large rock... "+
			baseText(),"tree1");
		console.log("\"game\" done");
	}
}
function End() {
	for(var z = 0; z<=numOfIntervals; z++) {
		clearInterval(z);
	}
	transmit("GAME OVER","computer");
	transmit("Enter \"Start\" to begin.","info");
	gameActive=false;
}
function here() {
	return eval("map.x"+player.position.x+".y"+player.position.y+".z"+player.position.z);
}
function meteoroid() {
	var astroX=parseInt(mapSize[1]*Math.random()+1);
	var astroZ=parseInt(mapSize[1]*Math.random()+1);
	if(!findIn("array",false,eval("map.x"+astroX+".y0.z"+astroZ+".resources"),"meteor",true)) {
		eval("map.x"+astroX+".y0.z"+astroZ+".resources.push([\"meteor\",\"none\",1])");
	}
	else {
		eval("map.x"+astroX+".y0.z"+astroZ+".resources[findIn(\"array\",0,eval(\"map.x\"+astroX+\".y0.z\"+astroZ+\".resources\"),\"meteor\",true)][2]++");
	}
	meteorText="You see a bright streak racing through the sky overhead. It lands with a thud and a shaking of the ground.";
	transmit(meteorText,"info");
}
function gameEvent(thisEvent) {
	if(Math.random()<eval("gameEvents."+thisEvent+".Chance")) {
		eval(eval("gameEvents."+thisEvent+".eventFunction"));
	}
}