OpTranslate = {add:"+",orr:"|",lef:"<<",sub:"-",and:"&",rig:">>",xor:"^"};
OpTranslate["+"]="add";
OpTranslate["|"]="orr";
OpTranslate["<<"]="lef";
OpTranslate["-"]="sub";
OpTranslate["&"]="and";
OpTranslate[">>"]="rig";
OpTranslate["^"]="xor";
function alchemy(A,B,Op) {
	var RA=Player.MetaLog[A];
	var RB=Player.MetaLog[B];
	var parts=[RA.split(","),RB.split(",")];
	var total={success:true};
	for(var i=0; i<parts[0].length; i++) {
		parts[0][i]=parseInt(parts[0][i],16);
		parts[1][i]=parseInt(parts[1][i],16);
	}
	if((Op=="add" || Op=="orr" || Op=="lef") && newComplexity(parts[0][0],parts[1][0],true)<256) {
		if(newComplexity(parts[0][0],parts[1][0],true)<255) {
			total=stepTwo(parts,Op,newComplexity(parts[0][0],parts[1][0],true).toString(16));
		}
		else {
			total={ID:-1,Meta:"ff,00,00,00,00,00,00,00,00,00,00,00,00,ff,ff,ff,ff,ff,80,80,00",result:"Your ingredients whirl around and fall into a state of Pure Chaos.",properties:""};
			if(Player.MetaLog.indexOf(total.Meta)==-1) {
				total.ID=Player.MetaLog.length;
				Player.MetaLog.push(total.Meta);
				Player.Inventory.push(0);
			}
			else {
				total.ID=Player.MetaLog.indexOf(total.Meta);
			}
		}
	}
	else if(Op=="sub" || Op=="and" || Op=="rig") {
		total=stepTwo(parts,Op,newComplexity(parts[0][0],parts[1][0],false).toString(16));
	}
	else if(Op=="xor") {
		total=stepTwo(parts,Op,Math.max(parts[0][0],parts[1][0]).toString(16));
	}
	else {
		total.result="Your ingredients combine to form a useless sludge";
		total.success=false;
	}
	return total;
}
function stepTwo(parts,Op,comp) {
	var total={ID:-1,Meta:"",result:"",properties:[],success:true};
	total.Meta+=comp;
	for(var i=1; i<parts[0].length; i++) {
		total.Meta+=",";
		total.Meta+=BinOps[Op](parts[0][i],parts[1][i]).toString(16);
	}
	if(Player.MetaLog.indexOf(total.Meta)==-1) {
		total.ID=Player.MetaLog.length;
		Player.MetaLog.push(total.Meta);
		Player.Inventory.push(0);
		total.result="You have created a NEW item! It has been given ID: "+total.ID;
	}
	else {
		total.ID=Player.MetaLog.indexOf(total.Meta);
		total.result="You have created the item with Alchemical ID: "+total.ID;
	}
	total.properties=describe(total.Meta);
	return total;
}
function alchemyButton() {
	if(Player.Inventory[parseInt(item1.value)]>0 && Player.Inventory[parseInt(item2.value)]>0) {
		Player.Inventory[parseInt(item1.value)]--;
		Player.Inventory[parseInt(item2.value)]--;
		var product=alchemy(parseInt(item1.value),parseInt(item2.value),alcOp.value);
		if(product.success) {
			var costs=cost(product.Meta);
			if((quant.value*costs[0])<=Player.Materials[0] && (quant.value*costs[1])<=Player.Materials[1] && (quant.value*costs[2])<=Player.Materials[2] && (quant.value*costs[3])<=Player.Materials[3]) {
				Player.Inventory[product.ID]+=parseInt(quant.value);
			}
			else {
				alert("You do not have enough Materials to create that.");
			}
			Player.Recipes.push({Reagent1:parseInt(item1.value),Reagent2:parseInt(item2.value),result:product.ID,Operator:OpTranslate[alcOp.value]});
			properties.innerHTML=product.properties;
		}
		output.innerHTML=product.result;
		setCookie("data",Player,365000);
	}
	else {
		alert("You do not have enough of the proper Reagents.");
	}
}
function newComplexity(compA,compB,mode) {
	if(mode) {
		return Math.round(((compA+compB+2*Math.max(compA,compB))/2-(compA+compB))/2)+Math.max(compA,compB);
	}
	else {
		return Math.round(((compA+compB+2*Math.min(compA,compB))/2-(compA+compB))/2)+Math.max(compA,compB);
	}
}
BinOps={};
BinOps.add = function (num1,num2) {
	var total=num1+num2;
	total-=256*Math.floor(total/256);
	return total;
}
BinOps.sub = function (num1,num2) {
	var total=num1-num2;
	if(total<0) {
		total+=256;
	}
	return total;
}
BinOps.and = function (num1,num2) {
	return num1 & num2;
}
BinOps.orr = function (num1,num2) {
	return num1 | num2;
}
BinOps.xor = function (num1,num2) {
	return num1 ^ num2;
}
BinOps.lef = function (num1,num2) {
	return num1 << num2;
}
BinOps.rig = function (num1,num2) {
	return num1 >> num2;
}

function genRandReagent() {
	var total=Math.floor(Math.random()*256).toString(16);
	for(var i=0; i<20; i++) {
		total+=(","+Math.floor(Math.random()*256).toString(16));
	}
	return total;
}
function populateMetaLog(num) {
	for(var i=0; i<num; i++) {
		Player.Inventory.push(1000);
		Player.MetaLog.push(genRandReagent());
	}
	console.log(JSON.stringify(Player))
}

function fillRecipes() {
	recipeList.innerHTML="";
	for(var i=0; i<Player.Recipes.length; i++) {
		recipeList.innerHTML+="\n<p>"+Player.Recipes[i].Reagent1+" "+Player.Recipes[i].Operator+" "+Player.Recipes[i].Reagent2+" = "+Player.Recipes[i].result+"</p>";
	}
}

function stats(meta) {
	var foo=meta.split(",")
	for(var i=0; i<foo.length; i++) {
		foo[i]=parseInt(foo[i],16);
	}
	var bar=[];
	for(var i=0; i<5; i++) {
		bar.push(Math.max(1/300,Math.min(256,(foo[(4*i)+1]&foo[(4*i)+2])|(foo[(4*i)+3]&foo[(4*i)+4]))));
	}
	return [Math.round(Math.max(-6,Math.min(11,Math.log(bar[4]*bar[0]/bar[1])))),Math.round(Math.max(-6,Math.min(11,Math.log(bar[4]*bar[1]/bar[3])))),Math.round(Math.max(-6,Math.min(11,Math.log(bar[4]*bar[2]/bar[0])))),Math.round(Math.max(-6,Math.min(11,Math.log(bar[4]*bar[3]/bar[2]))))];//Attack, Defense, Healing, Chaos
}
function cost(meta) {
	var foo=meta.split(",")
	for(var i=0; i<foo.length; i++) {
		foo[i]=parseInt(foo[i],16);
	}
	var bar=[0,0,0,0];
	for(var i=1; i<foo.length-4; i++) {
		bar[(i-1)%4]+=foo[i];
	}
	for(var i=foo.length-4; i<foo.length; i++) {
		bar[(i-1)%4]=Math.round(bar[(i-1)%4]*foo[i]);
	}
	for(var i=0; i<bar.length; i++) {
		bar[i]=(bar[i]&(2*bar[1]))|(bar[i]/2);
	}
	return bar;
}

function fillReagents() {
	reagentList.innerHTML="";
	for(var i=0; i<Player.Inventory.length; i++) {
		var stat=stats(Player.MetaLog[i]);
		var costs=cost(Player.MetaLog[i]);
		if(Player.MetaLog.indexOf("ff,00,00,00,00,00,00,00,00,00,00,00,00,ff,ff,ff,ff,ff,80,80,00")==-1) {
			reagentList.innerHTML+="\n<p>"+Player.Inventory[i]+"x ID "+i+": Statistics:[ Damage:"+stat[0]+", Defense:"+stat[1]+", Healing:"+stat[2]+", Complexity:"+Math.round(parseInt(Player.MetaLog[i].split(",")[0],16)/2.55)+" ], Creation Cost:[ Gist:"+costs[0]+", Grit:"+costs[1]+", Qrist:"+costs[2]+", Gris:"+costs[3]+" ] Description: "+describe(Player.MetaLog[i])+"</p>";
		}
		else {
			reagentList.innerHTML+="\n<p>"+Player.Inventory[i]+"x ID "+i+": Statistics:[ Damage:"+stat[0]+", Defense:"+stat[1]+", Healing:"+stat[2]+", Chaos:"+stat[3]+", Complexity:"+Math.round(parseInt(Player.MetaLog[i].split(",")[0],16)/2.55)+" ], Creation Cost:[ Gist:"+costs[0]+", Grit:"+costs[1]+", Qrist:"+costs[2]+", Gris:"+costs[3]+" ] Description: "+describe(Player.MetaLog[i])+"</p>";
		}
	}
}
function summonReagent() {
	var total=Math.abs(Math.floor((Math.random()*255)+(Math.random()*255))-255).toString(16);
	for(var i=0; i<20; i++) {
		total+=(","+Math.abs(Math.floor((Math.random()*255)+(Math.random()*255))-255).toString(16));
	}
	var costs=cost(total);
	if(costs[0]<=Player.Materials[0] && costs[1]<=Player.Materials[1] && costs[2]<=Player.Materials[2] && costs[3]<=Player.Materials[3]) {
		for(var i=0; i<4; i++) {
			Player.Materials[i]-=costs[i];
		}
		if(Player.MetaLog.indexOf(total)==-1) {
			Player.Inventory.push(2);
			Player.MetaLog.push(total);
		}
		else {
			Player.Inventory[Player.MetaLog.indexOf(total)]++;
		}
	}
	else {
		alert("You do not have enough Materials to do that.");
	}
	fillReagents();
	fillMaterials();
	setCookie("data",Player,365000);
}
function fillMaterials() {
	MatList.innerHTML="";
	MatList.innerHTML+="\n<p> Gist:"+Player.Materials[0]+", Grit:"+Player.Materials[1]+", Qrist:"+Player.Materials[2]+", Gris:"+Player.Materials[3]+" </p>";
}

function playerStats() {
	var Wea=Player.Equipment.Weapon;
	if(Wea=="") {
		Wea="00,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01";
	}
	var Arm=Player.Equipment.Armour;
	if(Arm=="") {
		Arm="00,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01";
	}
	var Wan=Player.Equipment.Wand;
	if(Wan=="") {
		Wan="00,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01";
	}
	var Dam=Math.round(Player.Lvl*stats(Wea)[0]*(1+(Math.sign(parseInt(Wea.split(","),16)/128-1)*Math.pow(parseInt(Wea.split(","),16)/128-1,2))));
	var Def=Math.round(Player.Lvl*stats(Arm)[1]*(1+(Math.sign(parseInt(Arm.split(","),16)/128-1)*Math.pow(parseInt(Arm.split(","),16)/128-1,2))));
	var Hea=Math.round(Player.Lvl*stats(Wan)[2]*(1+(Math.sign(parseInt(Wan.split(","),16)/128-1)*Math.pow(parseInt(Wan.split(","),16)/128-1,2))));
	var Cha=Math.round((stats(Wea)[2]+stats(Arm)[2]+(2*stats(Wan)[3]))*(1+(Math.sign(parseInt(Wan.split(","),16)/128-1)*Math.pow(parseInt(Wan.split(","),16)/128-1,2))));
	Player.Stats=[Dam,Def,Hea,Cha];
}
function equip(ID,slot) {
	if(Player.Inventory[ID]>0) {
		if(Player.Equipment[slot]!="") {
			Player.Inventory[Player.MetaLog.indexOf(Player.Equipment[slot])]++;
		}
		Player.Inventory[ID]--;
		Player.Equipment[slot]=Player.MetaLog[ID];
	}
	else {
		alert("You don't have that.");
	}
	playerStats();
	displayPlayerStats();
	displayPlayerEquip();
	setCookie("data",Player,365000);
}

function displayPlayerStats() {
	statDisplay.innerHTML=("Attack: "+Player.Stats[0]+", Defense: "+Player.Stats[1]+", Healing: "+Player.Stats[2])
}
function displayPlayerEquip() {
	equipDisplay.innerHTML="";
	for(var i in Player.Equipment) {
		if(Player.MetaLog.indexOf(Player.Equipment[i])!=-1) {
			var stat=stats(Player.Equipment[i]);
			if(Player.MetaLog.indexOf("ff,00,00,00,00,00,00,00,00,00,00,00,00,ff,ff,ff,ff,ff,80,80,00")==-1) {
				equipDisplay.innerHTML+="\n<p>"+i+": ID "+Player.MetaLog.indexOf(Player.Equipment[i])+", Statistics:[ Damage:"+stat[0]+", Defense:"+stat[1]+", Healing:"+stat[2]+", Complexity:"+Math.round(parseInt(Player.Equipment[i].split(",")[0],16)/2.55)+" ]</p>";
			}
			else {
				equipDisplay.innerHTML+="\n<p>"+i+": ID "+Player.MetaLog.indexOf(Player.Equipment[i])+", Statistics:[ Damage:"+stat[0]+", Defense:"+stat[1]+", Healing:"+stat[2]+", Chaos:"+stat[3]+", Complexity:"+Math.round(parseInt(Player.Equipment[i].split(",")[0],16)/2.55)+" ]/p>";
			}
		}
	}
}
function listEquipment() {
	equipID.innerHTML="";
	for(var i=0; i<Player.MetaLog.length; i++) {
		equipID.innerHTML+="\n<option value='"+i+"'>ID "+i+"</option>";
	}
}
Enemy={Name:"",Lvl:0,Stats:[0,0,0],number:0,tier:-1};
function fightRandom() {
	var syllableList=["imp","nem","ean","liv","ing","lant","cen","taur","el","men","tal","tre","bas","il","isk","og","re","tro","dra","gon"];
	Enemy.Name="";
	var nameLength=Math.ceil(Math.random()*4);
	for(var i=0; i<nameLength; i++) {
		Enemy.Name+=syllableList[Math.floor(Math.random()*syllableList.length)];
	}
	Enemy.Name+=" demon";
	Enemy.Name=toTitleCase(Enemy.Name);
	Enemy.Lvl=Player.Lvl;
	Enemy.number=1;
	Enemy.Stats[0]=Math.ceil(Math.random()*6);
	Enemy.Stats[1]=Math.ceil(Math.random()*6);
	Enemy.Stats[2]=Math.ceil(Math.random()*3);
	for(var i=0; i<Enemy.Stats.length; i++) {
		Enemy.Stats[i]=Roll(Enemy.Stats[i],18,-7,false,Enemy.Stats[i]-1);
	}
	fight();
}
function fightChosen() {
	var foeData=JSON.parse("["+foe.value+"]");
	Enemy.Name=foeData[4];
	Enemy.Lvl=parseInt(foeLvl.value);
	Enemy.Stats=[foeData[1],foeData[2],foeData[3]];
	Enemy.number=parseInt(foeNum.value);
	Enemy.tier=foeData[0];
	fight();
}

var foeFighters=[];
var Fighters=[];
function fight() {
	winnings=[0,0,0,0];
	choose.style="visibility: hidden";
	fighting.style="visibility: visible";
	Fighters.push(Player);
	Fighters[0].Health=(Player.Lvl*20);
	Fighters[0].action="";
	if(Player.Mercenary.Username!="none") {
		Fighters.push(Player.Mercenary);
		Fighters[1].Health=(Fighters[1].Lvl*20);
	}
	for(var i=0; i<Enemy.number; i++) {
		foeFighters.push(Enemy.Rel());
		foeFighters[i].Health=(foeFighters[i].Lvl*20);
		for(var j=0; j<foeFighters[i].Stats.length; j++) {
			foeFighters[i].Stats[j]*=foeFighters[i].Lvl;
		}
	}
	displayFighters();
}
function displayFighters() {
	target.innerHTML="";
	enemies.innerHTML="";
	for(var i=0; i<Enemy.number; i++) {
		var total="<div>\n<h3>";
		total+=foeFighters[i].Name;
		total+="</h3>\n<p>";
		total+=("Attack: "+foeFighters[i].Stats[0]+", Defense: "+foeFighters[i].Stats[1]+", Healing: "+foeFighters[i].Stats[2]);
		total+="</p>\n<p>";
		total+=("Health: "+foeFighters[i].Health+"/"+(foeFighters[i].Lvl*20));
		total+="</p>\n</div>"
		enemies.innerHTML+=total;
		target.innerHTML+="<option value='foe/"+i+"'>"+foeFighters[i].Name+"</option>";
	}
	allies.innerHTML="";
	for(var i=0; i<Fighters.length; i++) {
		var total="<div>\n<h3>";
		total+=Fighters[i].Username;
		total+="</h3>\n<p>";
		total+=("Attack: "+Fighters[i].Stats[0]+", Defense: "+Fighters[i].Stats[1]+", Healing: "+Fighters[i].Stats[2]);
		total+="</p>\n<p>";
		total+=("Health: "+Fighters[i].Health+"/"+(Fighters[i].Lvl*20));
		total+="</p>\n</div>"
		allies.innerHTML+=total;
		target.innerHTML+="<option value='friend/"+i+"'>"+Fighters[i].Username+"</option>";
	}
}
var winnings=[0,0,0,0];
function attack() {
	Fighters[0].action=action.value;
	for(var i=0; i<foeFighters.length; i++) {
		var randomAction=Math.ceil(Math.random()*(1.5*foeFighters[i].Stats[0]+foeFighters[i].Stats[1]+foeFighters[i].Stats[2]/2));
		if((foeFighters[i].Stats[0]*1.5)>randomAction) {
			foeFighters[i].action="Attack";
		}
		else if((1.5*foeFighters[i].Stats[0]+foeFighters[i].Stats[1])>randomAction || foeFighters.length<2) {
			foeFighters[i].action="Block";
		}
		else {
			foeFighters[i].action="Heal";
		}
	}

	if(action.value=="Attack" && target.value.split("/")[0]=="foe") {
		if(foeFighters[parseInt(target.value.split("/")[1])].action=="Block") {
			foeFighters[parseInt(target.value.split("/")[1])].Health-=Math.max(0,Fighters[0].Stats[0]-foeFighters[parseInt(target.value.split("/")[1])].Stats[1]);
		}
		else {
			foeFighters[parseInt(target.value.split("/")[1])].Health-=Math.max(0,Fighters[0].Stats[0]-(foeFighters[parseInt(target.value.split("/")[1])].Stats[1]/2));
		}
	}
	else if(action.value=="Heal" && target.value.split("/")[0]=="friend") {
		Fighters[parseInt(target.value.split("/")[1])].Health+=Math.max(0,Fighters[0].Stats[2])
	}
	for(var i=1; i<Fighters.length; i++) {
		if(Fighters[i].role==0) {
			var Target=foeFighters.Lowest("Health");
			if(foeFighters[Target].action=="Block") {
				foeFighters[Target].Health-=Math.max(0,Fighters[i].Stats[0]-foeFighters[Target].Stats[1]);
			}
			else {
				foeFighters[Target].Health-=Math.max(0,Fighters[i].Stats[0]-(foeFighters[Target].Stats[1]/2));
			}
		}
		else if(Fighters[i].role==2) {
			Fighters[Fighters.Lowest("Health")].Health+=Math.ceil(Math.max(0,Fighters[i].Stats[2])/4);
		}
	}
	for(var i=0; i<foeFighters.length; i++) {
		var Target=Math.floor(Math.random()*Fighters.length);
		if(foeFighters[i].action=="Attack") {
			if(Fighters[Target].action=="Block") {
				Fighters[Target].Health-=Math.max(0,foeFighters[i].Stats[0]-Fighters[Target].Stats[1]);
			}
			else {
				Fighters[Target].Health-=Math.max(0,foeFighters[i].Stats[0]-(Fighters[Target].Stats[1]/2));
			}
		}
		else if(foeFighters[i].action=="Heal") {
			Target=Math.floor(Math.random()*foeFighters.length);
			foeFighters[Target].Health+=Math.ceil(Math.max(0,foeFighters[i].Stats[2])/4);
		}
	}

	for(var i=0; i<foeFighters.length; i++) {
		if(foeFighters[i].Health<=0) {
			winnings[Math.floor(Math.random()*4)]+=(3612+Math.ceil(Math.random()*3613*(foeFighters[i].tier*foeFighters[i].Lvl/Player.Lvl)));
			Player.cash+=Math.round((foeFighters[i].Lvl*foeFighters[i].tier*35)*(0.75+Math.random()/2));
			foeFighters.splice(i,1);
		}
	}
	for(var i=1; i<Fighters.length; i++) {
		if(Fighters[i].Health<=0) {
			Fighters.splice(i,1);
		}
	}

	if(foeFighters.length<1 && Fighters[0].Health<=0) {
		condition.innerHTML="You tie!";
		lvlUp();
	}
	else if(foeFighters.length<1) {
		condition.innerHTML="You win! ☺";
		winnings[Math.floor(Math.random()*4)]+=(7225+Math.ceil(Math.random()*7225*(Enemy.Lvl/Player.Lvl)));
		lvlUp();
	}
	else if(Fighters[0].Health<=0) {
		condition.innerHTML="You lose. ☹";
	}
	if(foeFighters.length<1 || Fighters[0].Health<=0) {
		foeFighters=[];
		enemies.innerHTML="";
		Fighters=[];
		allies.innerHTML="";
		choose.style="visibility: visible";
		fighting.style="visibility: hidden";
		for(var i=0; i<4; i++) {
			Player.Materials[i]+=winnings[i];
		}
		setCookie("data",Player,365000);
	}
	else {
		displayFighters();
	}
}

function summonID() {
	var meta=Player.MetaLog[parseInt(reagID.value)];
	var costs=cost(meta);
	if((costs[0]*parseInt(reagNum.value))<=Player.Materials[0] && (costs[1]*parseInt(reagNum.value))<=Player.Materials[1] && (costs[2]*parseInt(reagNum.value))<=Player.Materials[2] && (costs[3]*parseInt(reagNum.value))<=Player.Materials[3]) {
		for(var i=0; i<4; i++) {
			Player.Materials[i]-=costs[i];
		}
		Player.Inventory[reagID.value]+=parseInt(reagNum.value);
	}
	else {
		alert("You do not have enough Materials.");
	}
	fillReagents();
	fillMaterials();
	setCookie("data",Player,365000);
}

function mercFill() {
	var d = new Date();
	Time=Math.floor(d.getTime()/(1000*60*60*24));
	if(Time!=Player.mercUpdate) {
		Player.mercUpdate=Time;
		Player.Mercenaries=[];
		for(var i=0; i<5; i++) {
			var mercLvl=Math.ceil(Math.random()*Player.Lvl*2);
			Player.Mercenaries.push({Username:"Mercenary",Lvl:mercLvl,Stats:[Math.ceil(mercLvl*Math.random()*2*Roll(3,18,-7,false,2)),Math.ceil(mercLvl*Math.random()*2*Roll(3,18,-7,false,2)),Math.ceil(mercLvl*Math.random()*2*Roll(3,18,-7,false,2))],number:0});
		}
	}
	for(var i=0; i<5; i++) {
		var temp="";
		if(Player.Mercenaries[i].Stats[0]>=Player.Mercenaries[i].Stats[2]) {
			temp+="\n<h2>Mercenary</h2>";
			Player.Mercenaries[i].role=0;
			temp+="\n<p>"+("Attack: "+Player.Mercenaries[i].Stats[0]+", Defense: "+Player.Mercenaries[i].Stats[1]+", Healing: "+Player.Mercenaries[i].Stats[2])+"</p>";
			temp+="\n<p>Price: ¤"+(((2*Player.Mercenaries[i].Stats[0])+Player.Mercenaries[i].Stats[1]+20)*10*Player.Mercenaries[i].Lvl)+"</p>";
			temp+='\n<input type="button" value="Hire" onclick="hireMerc('+i+')">';
			Player.Mercenaries[i].Username="Mercenary";
		}
		else {
			temp+="\n<h2>Healer</h2>";
			Player.Mercenaries[i].role=2;
			temp+="\n<p>"+("Attack: "+Player.Mercenaries[i].Stats[0]+", Defense: "+Player.Mercenaries[i].Stats[1]+", Healing: "+Player.Mercenaries[i].Stats[2])+"</p>";
			temp+="\n<p>Price: ¤"+(((2*Player.Mercenaries[i].Stats[2])+Player.Mercenaries[i].Stats[1]+20)*10*Player.Mercenaries[i].Lvl)+"</p>";
			temp+='\n<input type="button" value="Hire" onclick="hireMerc('+i+')">';
			Player.Mercenaries[i].Username="Healer";
		}
		document.getElementById("merc"+i).innerHTML=temp;
	}
	money.innerHTML+=(Player.cash+".");
	time.innerHTML+=(" "+(24-(Math.floor(d.getTime()/(1000*60*60))-(Player.mercUpdate*24)))+" hours remaining before reset.");
	setCookie("data",Player,365000);
}
function hireMerc(ID) {
	var price=(((2*Player.Mercenaries[ID].Stats[Player.Mercenaries[ID].role])+Player.Mercenaries[ID].Stats[1]+20)*10*Player.Mercenaries[ID].Lvl);
	if(price<=Player.cash) {
		Player.cash-=price;
		Player.Mercenary=Player.Mercenaries[ID].Rel();
		mercFill();
	}
	else {
		alert("You do not have enough money.")
	}
}