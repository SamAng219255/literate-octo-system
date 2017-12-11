version=7;
function parseMath(func,Var,x,reference) {
	return Math.eval(halfParseMath(func,Var,x),reference);
}
function halfParseMath(func,Var,x) {
	var list=func.split("");
	var funcList=[];
	var half={list:[],mode:{mode:"normal",Value:0}};
	for(var i=0; i<list.length; i++) {
		var depth=half;
		if(i>0) {
			depth=getDepth(half);
		}
		var thing=list[i];
		var place=depth.list[depth.list.length-1];
		if(depth.mode.mode=="string") {
			if(thing=="\"") {
				depth.mode={mode:"normal",Value:0};
			}
			else {
				place.Value+=thing;
			}
		}
		else if(!isNaN(thing)) {
			if(depth.list.length==0 || place.kind!="number") {
				addToEnd(depth.list,{kind:"number",Value:parseInt(thing)});
			}
			else {
				if(depth.mode.mode!="decimal") {
					place.Value*=10;
					place.Value+=parseInt(thing);
				}
				else if(depth.mode.mode=="decimal") {
					place.Value+=(parseInt(thing)*Math.pow(0.1,depth.mode.Value));
					place.Value=Math.round(place.Value*Math.pow(10,depth.mode.Value))/Math.pow(10,depth.mode.Value);
					depth.mode.Value++;
				}
			}
		}
		else if(thing==".") {
			depth.mode={mode:"decimal",Value:1};
		}
		else if(thing=="(") {
			depth.mode={mode:"()",Value:0};
			addToEnd(depth.list,{kind:"equation",Value:{list:[],mode:{mode:"normal",Value:0}}});
		}
		else if(thing==")") {
			getHigher(half).mode={mode:"normal",Value:0};
		}
		else if(thing=="+" || thing=="-" || thing=="*" || thing=="/" || thing=="^" || thing=="&" || thing=="|" || thing=="%") {
			addToEnd(depth.list,{kind:"operator",Value:thing});
			depth.mode={mode:"normal",Value:0};
		}
		else if(thing==Var && depth.mode.mode!=["function"]) {
			addToEnd(depth.list,{kind:"number",Value:x});
			depth.mode={mode:"normal",Value:0};
		}
		else if(thing=="e" && depth.mode.mode!="function") {
			addToEnd(depth.list,{kind:"number",Value:Math.E});
			depth.mode={mode:"normal",Value:0};
		}
		else if(thing=="π") {
			addToEnd(depth.list,{kind:"number",Value:Math.PI});
			depth.mode={mode:"normal",Value:0};
		}
		else if(thing=="\"") {
			addToEnd(depth.list,{kind:"string",Value:""});
			depth.mode={mode:"string",Value:0};
		}
		else if(thing=="[") {
			depth.mode={mode:"list",Value:0};
			addToEnd(depth.list,{kind:"list",Value:{list:[],mode:{mode:"normal",Value:0}}});
		}
		else if(thing=="]") {
			getHigher(half).mode={mode:"normal",Value:0};
		}
		else if(thing==",") {
			depth.mode={mode:"normal",Value:0};
			addToEnd(depth.list,{kind:"break",Value:0});
		}
		else {
			if(depth.list.length==0 || place.kind!="function") {
				addToEnd(depth.list,{kind:"function",Value:thing});
			}
			else {
				place.Value+=thing;
			}
			depth.mode={mode:"function",Value:0};
		}
	}
	return half;
}
function addToEnd(list,data) {
	list.splice(list.length,0,data);
}
function getDepth(place) {
	if(typeof place=="object" && (place.mode.mode=="()" || place.mode.mode=="list")) {
		return getDepth(place.list[place.list.length-1].Value);
	}
	else {
		return place;
	}
}
function getHigher(place) {
	if(typeof place.list[place.list.length-1].Value=="object" && (place.list[place.list.length-1].Value.mode.mode=="()" || place.list[place.list.length-1].Value.mode.mode=="list")) {
		return getHigher(place.list[place.list.length-1].Value);
	}
	else {
		return place;
	}
}
Math.eval = function (Phrase,reference) {
	var phrase=Phrase.Rel();
	var Reference;
	if(typeof reference!="undefined") {
		Reference=reference;
	}
	else {
		Reference=Math;
	}
	for(var i=0; i<phrase.list.length; i++) {
		if(phrase.list[i].kind=="equation") {
			phrase.list[i]={Value:Math.eval(phrase.list[i].Value,Reference),kind:"number"};
		}
		else if(phrase.list[i].kind=="break") {
			phrase.list.splice(i,1);
		}
		else if(phrase.list[i].kind=="function" && (i==(phrase.list.length-1) || phrase.list[i+1].kind!="equation")) {
			var vars=phrase.list[i].Value.split("");
			phrase.list.splice(i,1);
			for(var j=0; j<vars.length; j++) {
				phrase.list.splice(i+j,0,{Value:Reference[vars[j]],kind:"number"});
			}
		}
	}
	for(var k=0; k<5; k++) {
		var higherOps=[[],[],[],[],[]];
		for(var i=0; i<phrase.list.length; i++) {
			if(phrase.list[i].kind=="operator") {
				if(phrase.list[i].Value=="&" || phrase.list[i].Value=="|") {
					higherOps[0].push(i);
				}
				else if(phrase.list[i].Value=="^") {
					higherOps[2].push(i);
				}
				else if(phrase.list[i].Value=="/" || phrase.list[i].Value=="*" || phrase.list[i].Value=="%") {
					higherOps[3].push(i);
				}
				else if(phrase.list[i].Value=="-" || phrase.list[i].Value=="+") {
					higherOps[4].push(i);
				}
			}
			else if(phrase.list[i].kind=="function") {
				higherOps[1].push(i);
			}
		}
		var passed=0;
		for(var i=0; i<higherOps[k].length; i++) {
			if(phrase.list[higherOps[k][i]-passed].Value=="^") {
				phrase.list[higherOps[k][i]-passed-1].Value=Math.pow(phrase.list[higherOps[k][i]-passed-1].Value,phrase.list[higherOps[k][i]-passed+1].Value);
				phrase.list.splice(higherOps[k][i]-passed,2);
				passed+=2;
			}
			else if(phrase.list[higherOps[k][i]-passed].Value=="*") {
				phrase.list[higherOps[k][i]-passed-1].Value=phrase.list[higherOps[k][i]-passed-1].Value*phrase.list[higherOps[k][i]-passed+1].Value;
				phrase.list.splice(higherOps[k][i]-passed,2);
				passed+=2;
			}
			else if(phrase.list[higherOps[k][i]-passed].Value=="/") {
				phrase.list[higherOps[k][i]-passed-1].Value=phrase.list[higherOps[k][i]-passed-1].Value/phrase.list[higherOps[k][i]-passed+1].Value;
				phrase.list.splice(higherOps[k][i]-passed,2);
				passed+=2;
			}
			else if(phrase.list[higherOps[k][i]-passed].Value=="+") {
				phrase.list[higherOps[k][i]-passed-1].Value=phrase.list[higherOps[k][i]-passed-1].Value+phrase.list[higherOps[k][i]-passed+1].Value;
				phrase.list.splice(higherOps[k][i]-passed,2);
				passed+=2;
			}
			else if(phrase.list[higherOps[k][i]-passed].Value=="-") {
				phrase.list[higherOps[k][i]-passed-1].Value=phrase.list[higherOps[k][i]-passed-1].Value-phrase.list[higherOps[k][i]-passed+1].Value;
				phrase.list.splice(higherOps[k][i]-passed,2);
				passed+=2;
			}
			else if(phrase.list[higherOps[k][i]-passed].Value=="&") {
				phrase.list[higherOps[k][i]-passed-1].Value=phrase.list[higherOps[k][i]-passed-1].Value&phrase.list[higherOps[k][i]-passed+1].Value;
				phrase.list.splice(higherOps[k][i]-passed,2);
				passed+=2;
			}
			else if(phrase.list[higherOps[k][i]-passed].Value=="|") {
				phrase.list[higherOps[k][i]-passed-1].Value=phrase.list[higherOps[k][i]-passed-1].Value|phrase.list[higherOps[k][i]-passed+1].Value;
				phrase.list.splice(higherOps[k][i]-passed,2);
				passed+=2;
			}
			else if(phrase.list[higherOps[k][i]-passed].Value=="%") {
				phrase.list[higherOps[k][i]-passed-1].Value=phrase.list[higherOps[k][i]-passed-1].Value%phrase.list[higherOps[k][i]-passed+1].Value;
				phrase.list.splice(higherOps[k][i]-passed,2);
				passed+=2;
			}
			else {
				phrase.list[higherOps[k][i]-passed]={Value:Math[phrase.list[higherOps[k][i]-passed].Value](phrase.list[higherOps[k][i]-passed+1].Value),kind:"number"};
				phrase.list.splice(higherOps[k][i]-passed+1,1);
				passed+=1;
			}
		}
	}
	if(phrase.list.length==1) {
		if(phrase.list[0].Value.constructor == Array) {
			return phrase.list[0].Value.Rel();
		}
		else if(typeof phrase.list[0].Value == "object") {
			return phrase.list[0].Value.list;
		}
		else {
			return phrase.list[0].Value;
		}
	}
	else {
		console.log(phrase.list);
		return "ERROR";
	}
}
Math.equivalent = function (Value) {
	if(!isNaN) {
		return Value;
	}
	else if(typeof Value=="object") {
		return Math.eval(Value);
	}
	else {
		return NaN;
	}
}
Array.prototype.Rel = function () {
	return JSON.parse(JSON.stringify(this));
}
Object.prototype.Rel = function () {
	return JSON.parse(JSON.stringify(this));
}
class mathFunction {
	constructor(funcStr,varStr) {
		this.funcStr=funcStr;
		this.Var=varStr;
		this.Vars={};
		this.run = function (x,vars) {
			this.Vars=vars;
			return parseMath(this.funcStr,this.Var,x,this.Vars);
		}
	}
}