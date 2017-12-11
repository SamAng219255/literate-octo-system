function canvasSetup() {
	canvas=document.getElementById("Graph")
	ctx=canvas.getContext("2d");
}
Array.prototype.extend = function (other_array) {
	other_array.forEach(function(v) {this.push(v)}, this);    
}
function RFP(obj) {
	return JSON.parse(JSON.stringify(obj));
}
function inInterval(item,intervalNote) {
	bool=false;
	if((intervalNote[intervalNote.length-1]>intervalNote[0] && intervalNote[intervalNote.length-1]>=item && intervalNote[0]<=item) 
		|| (intervalNote[intervalNote.length-1]<intervalNote[0] && intervalNote[intervalNote.length-1]<=item && intervalNote[0]>=item)
		|| (intervalNote[intervalNote.length-1]==intervalNote[0] && intervalNote[intervalNote.length-1]==item && intervalNote[0]==item)) {
			bool=true;
	}
	return bool;
}
function convertPoint(point,range) {
	return [500*((point[0]-range[0][0])/(range[0][1]-range[0][0])),500-500*((point[1]-range[1][0])/(range[1][1]-range[1][0]))];
}
function unconvertPoint(point,range) {
	return [((point[0]/500)*(range[0][1]-range[0][0]))+range[0][0],(((500-point[1])/500)*(range[1][1]-range[1][0]))+range[1][0]]
}
function translateArrayToString(list) {
	var stringThing="";
	for(var i = 0; i<list.length; i++) {
		if(typeof list[i] == "string") {
			stringThing+=("\""+list[i]+"\"");
		}
		else if(list[i].constructor == Array) {
			stringThing+=("["+translateArrayToString(list[i])+"]");
		}
		else if(typeof list[i] == "object") {
			stringThing+=("{"+translateObjectToString(list[i])+"}");
		}
		else if(typeof list[i] != "undefined") {
			stringThing+=list[i];
		}
		if((i+1)<list.length) {
			stringThing+=",";
		}
	}
	return stringThing;
}
function translateObjectToString(thing) {
	var stringThing="";
	var i=0;
	for(var prop in thing) {
		i++;
		stringThing+=(prop+":");
		if(typeof eval("thing."+prop) == "string") {
			stringThing+=("\""+eval("thing."+prop)+"\"");
		}
		else if(eval("thing."+prop).constructor == Array) {
			stringThing+=("["+translateArrayToString(eval("thing."+prop))+"]");
		}
		else if(typeof eval("thing."+prop) == "object") {
			stringThing+=("{"+translateObjectToString(eval("thing."+prop))+"}");
		}
		else if(typeof eval("thing."+prop) != "undefined") {
			stringThing+=eval("thing."+prop);
		}
		if(i<objLength(thing)) {
			stringThing+=",";
		}
	}
	return stringThing;
}
function translateToString(thing) {
	var stringThing="";
	if(typeof thing == "string") {
		stringThing+=("\""+thing+"\"");
	}
	else if(thing.constructor == Array) {
		stringThing+=("["+translateArrayToString(thing)+"]");
	}
	else if(typeof thing == "object") {
		stringThing+=("{"+translateObjectToString(thing)+"}");
	}
	else if(typeof thing != "undefined") {
		stringThing+=thing;
	}
	return stringThing;
}
function checkIfLegal(input) {
	legal = true;
	temp = input.split("");
	for(var i = 0; i<temp.length; i++) {
		if(input[i]=="\\") { legal = false; }
	}
	return legal;
}