function tree14(input) {//eject
	if(eval("typeof inventory.items."+input)!="undefined") {
		if(eval("inventory.items."+input+".count")>=1) {
			eval("inventory.items."+input+".count--");
			transmit("You get rid of the "+input+".");
		}
		else {transmit("You don't have that.","computer");}
	}
	else {transmit("You don't have that.","computer");}
	shouldUpdate=true;
	receive("tree1",true);
}