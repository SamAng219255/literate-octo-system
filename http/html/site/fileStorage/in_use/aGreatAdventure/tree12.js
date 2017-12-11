function tree12(input) {//equip
	if(findIn("object",false,"armours",input) && eval("inventory.items."+input+"Armor.count")>0) {
		if(player.equipment.armor!="none") {
			if(eval("window.inventory.items."+player.equipment.armor+"Armor")==undefined) {
				createNewObject([player.equipment.armor+"Armor",true,false]);
				eval("inventory.items."+player.equipment.armor+"Armor.armorBonus="+eval("armours."+player.equipment.armor+".armorBonus"));

			}
			eval("inventory.items."+player.equipment.armor+"Armor.count++");
		}
		player.equipment.armor=input;
		eval("inventory.items."+input+"Armor.count--");
	}
	shouldUpdate=true;
	receive("tree1",true);
}