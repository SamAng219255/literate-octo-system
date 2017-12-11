function randElem(obj) {
	var i=0;
	for(var prop in obj) {
		i++;
		eval("var prop"+i+"={}");
		eval("prop"+i+"=eval(\"obj.\"+prop)");
	}
	return eval("prop"+(parseInt(Math.random()*i)+1));
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
function findIn(mode1,mode2,lookingIn,lookingFor,mode3) {
	var searchGoal = null;
	if(window.mode3==undefined) {
		if(mode1==="array") {
			if(mode2==false) {
				searchGoal=lookingIn.indexOf(lookingFor);
				/*
				for(var i = 0; i<lookingIn.length; i++) {
					if(lookingIn[i]==lookingFor) {searchGoal=i; i=1000}
				}
				*/
			}
			else {
				for(var i=0; i<lookingIn.length; i++) {
					if(lookingIn[i][0]==lookingFor) {searchGoal=lookingIn[i][mode2]; i=1000;}
				}
			}
		}
		else if(mode1=="object") {
			if(mode2==false) {
				eval("searchGoal=(window."+lookingIn+"."+lookingFor+"!=undefined)");
			}
			else {
				if(eval("window."+lookingIn+"."+lookingFor+"!=undefined")) {
					searchGoal=lookingIn;
				}
			}
		}
	}
	else if(mode3==true) {
		if(mode1==="array") {
			if(mode2==false) {
				searchGoal=(lookingIn.indexOf(lookingFor)>=0);
			}
			else {
				for(var i=0; i<lookingIn.length; i++) {
					if(lookingIn[i][mode2]==lookingFor) {searchGoal=i; i=1000;}
				}
			}
		}
		else if(mode1=="object") {
			if(mode2==false) {
				eval("searchGoal=(window."+lookingIn+"."+lookingFor+"!=undefined)");
			}
			else {
				if(eval("window."+lookingIn+"."+lookingFor+"!=undefined")) {
					searchGoal=eval(lookingIn+"."+lookingFor);
				}
			}
		}
	}
	return searchGoal;
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
function objLength(obj) {
  var count = 0;
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop))
      ++count;
  }
  return count;
}
function addToArray(array,addition) {
	var arrayAdding = array;
	arrayAdding.push(addition);
	return arrayAdding;
	/*
	var completeArray=[];
	var arrayContents="[";
	arrayContents+=translateArrayToString(array);
	if(array.length>0) {
		arrayContents+=","
	}
	arrayContents+=translateToString(addition)
	arrayContents+="]"
	return eval(arrayContents);
	*/
}
Array.prototype.extend = function (other_array) {
	other_array.forEach(function(v) {this.push(v)}, this);    
}
function removeFromList(list,subtraction) {
	var array = list;
	array.splice(array.indexOf(subtraction),1);
	return array;
	/*
	var endList=[];
	var reject=subtraction;
	for(var i=0; i<list.length; i++) {
		if(list[i]!=reject) {
			endList=addToArray(endList,list[i])
		}
		else {
			reject=null;
		}
	}
	return endList;
	*/
}
function checkForMatches(item,list) {
	var matches = 0;
	for(var i = 0; i<list.length; i++) {
		if(list[i]==item) {
			matches++;
		}
	}
	return matches;
}
function textList(list) {
	var finalList=[];
	for(var i = 0; i<list.length; i++) {
		if(list[i][1]>0) {
			finalList=addToArray(finalList,list[i])
		}
	}
	var textListAND = "";
	if(finalList.length>1) {
		for(var i = 0; i<(finalList.length-1); i++) {
			if(finalList[i][1]==1) {
				if(checkForMatches(finalList[i][0].split("")[0],["a","e","i","o","u"])) {
					textListAND+="an ";
				}
				else {
					textListAND+="a ";
				}
			}
			else if(finalList[i][1]>1) {
				textListAND+=(finalList[i][1]+" ");
			}
			textListAND+=finalList[i][0];
			if(finalList[i][1]>1) {
				var lastCharacter=finalList[i][0].split("")[finalList[i][0].split("").length-1]
				if(lastCharacter=="s" || lastCharacter=="h") {
					textListAND+="es";
				}
				else {
					textListAND+="s";
				}
			}
			textListAND+=", ";
		}
		var finalWord=finalList[finalList.length-1][0]
		textListAND+="and ";
		if(finalList[i][1]==1) {
			if(checkForMatches(finalWord.split("")[0],["a","e","i","o","u"])) {
				textListAND+="an ";
			}
			else {
				textListAND+="a ";
			}
		}
		else if(finalList[i][1]>1) {
			textListAND+=(finalList[i][1]+" ");
		}
		textListAND+=finalWord
		if(finalList[i][1]>1) {
			var lastCharacter=finalWord.split("")[finalWord.split("").length-1]
			if(lastCharacter=="s" || lastCharacter=="h") {
				textListAND+="es";
			}
			else {
				textListAND+="s";
			}
		}
		return textListAND;
	}
	else if(finalList.length==1) {
		if(finalList[0][1]==1) {
			if(checkForMatches(finalList[0][0].split("")[0],["a","e","i","o","u"])) {
				textListAND+="an ";
			}
			else {
				textListAND+="a ";
			}
		}
		else if(finalList[0][1]>1) {
			textListAND+=(finalList[0][1]+" ");
		}
		textListAND+=finalList[0][0]
		if(finalList[0][1]>1) {
			var lastCharacter=finalList[0][0].split("")[finalList[0][0].split("").length-1]
			if(lastCharacter=="s" || lastCharacter=="h") {
				textListAND+="es";
			}
			else {
				textListAND+="s";
			}
		}
		return textListAND;
	}
	else {
		return "nothing";
	}
}
function textListSimple(list) {
	var outText="";
	var textListAND = "";
	if(list.length>1) {
		for(var i = 0; i<(list.length-1); i++) {
			textListAND+=list[i];
			textListAND+=", ";
		}
		textListAND+="and ";
		textListAND+=list[list.length-1]
		outText=textListAND;
	}
	else if(list.length==1) {
		textListAND+=list[0]
		outText=textListAND;
	}
	else {
		outText="nothing";
	}
	return outText;
}
function removeDuplicates(list) {
	return list.filter(function(elem, pos) {
		return list.indexOf(elem) == pos;
	}); 
	/*
	var endList=[];
	var rejectList=[];
	for(var i=0; i<list.length; i++) {
		if(checkForMatches(list[i],rejectList)<1) {
			endList=addToArray(endList,list[i])
			if(checkForMatches(list[i],list)>1) {
				rejectList=addToArray(rejectList,list[i]);
			}
		}
	}
	return endList;
	*/
}
function alphabetize(list) {
	var endList=[];
	var orderList=[];
	for(var i=0; i<list.length; i++) {
		var currentValue=0;
		for(var j=0; j<10; j++) {
			if(list[i].split("")[j]==undefined) {
				currentValue+=Math.pow(123,(10-j));
			}
			else {
				currentValue+=Math.pow(123,(10-j))*list[i].toLowerCase().split("")[j].charCodeAt();
			}
		}
		orderList=addToArray(orderList,currentValue);
	}
	var temp=orderList.length;
	var temp2=list;
	for(var i=0; i<temp; i++) {
		endList=addToArray(endList,temp2[findIn("array",false,orderList,eval("Math.min("+orderList+")"))]);
		temp2=removeFromList(temp2,temp2[findIn("array",false,orderList,eval("Math.min("+orderList+")"))]);
		orderList=removeFromList(orderList,eval("Math.min("+orderList+")"));
	}
	return endList;
}
if(typeof finishLoad === "function") {
	finishLoad();
}