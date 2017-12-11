function tree2() {//INVENTORY
	var inventoryList=[];
	for(var h in inventory.items) {
		eval("inventoryList=addToArray(inventoryList,[inventory.items."+h+".Name,inventory.items."+h+".count])");
	}
	transmit("You have "+textList(inventoryList)+".", "computer")
	console.log("\"tree2\" done");
	receive("tree1",true);
}