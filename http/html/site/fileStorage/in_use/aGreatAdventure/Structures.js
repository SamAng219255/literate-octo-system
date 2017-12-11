function generateStructures() {
	for(var prop1 in map) {
		for(var prop2 in eval("map."+prop1)) {
			for(var prop3 in eval("map."+prop1+"."+prop2)) {
				for(var thing in structures.natural) {
					if(eval("structures.natural."+thing+".allowed")) {
						if (!eval("structures.natural."+thing+".continueAllowed")) {
							eval("structures.natural."+thing+".allowed=false");
						}
						if(Math.random()<=eval("structures.natural."+thing+".required")) {
							eval("map."+prop1+"."+prop2+"."+prop3+".structures="+"addToArray(map."+prop1+"."+prop2+"."+prop3+".structures,structures.natural."+thing+
								");");
						}
					}
				}
			}
		}
	}
}