Array.prototype.Rel = function () {
	return JSON.parse(JSON.stringify(this));
}
Object.prototype.Rel = function () {
	return JSON.parse(JSON.stringify(this));
}
function toTitleCase(str) {
	return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
/*function valid(password) {
	if(password.length<4) {
		return false;
	}
	else {
		var valid=true;
		for(var i=0; i<password.length; i++) {
			if(isNaN(parseInt(password[i],36))) {
				valid=false;
			}
			else if(password.indexOf(password[i])!=i) {
				valid=false;
			}
		}
		return valid;
	}
}
function cipher(word) {
	var work=word.split("");
	var groups=Math.ceil(work.length/Key.groupSize);
	var total=0;
	for(var i=0; i<work.length; i++) {
		total+=(Key.key[parseInt(work[i],36)]*Math.pow(2,36*Math.floor(i/Key.groupSize)));
	}
	return word;
}
function login() {
	var temp=document.getElementById("Password").value;
	var temp=temp.split("");
	if(valid(temp)) {
		sendToServer("login",[document.getElementById("Username").value,cipher(document.getElementById("Password").value)]);
	}
	else {
		alert("You have entered an invalid password. \nTo be a valid password it must: \n• Have no reapeated characters. \n• Only include letters and numbers. \n• Be 4 characters or longer.");
	}
		
}
function sendToServer(operation,data) {
	return pseudoServer(operation,data);
}
Key=sendToServer("key",[]);*/

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







function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + JSON.stringify(cvalue) + ";" + expires + ";path=/";
    console.log(cname + "=" + JSON.stringify(cvalue) + ";" + expires + ";path=/");
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return JSON.parse(c.substring(name.length, c.length));
        }
    }
    return "";
}

function checkCookie(cname,pass,fail) {
    var user = getCookie(cname);
    if (user != "") {
        pass(user);
    }
    else {
        user = fail();
        if (user != "" && user != null) {
            setCookie(cname, user, 365000);
        }
    }
}

Player={};
function Welcome(data) {
	Player=data;
}
function NewPlayer() {
	if(document.location.href.split("/")[0]!="file:") {
		if(document.location.href.split("/")[document.location.href.split("/").length-2]=="Home") {
			return Player={Username:prompt("Welcome!\nPlease enter a username:"),Inventory:[],MetaLog:[],Recipes:[],Materials:[578000,578000,578000,578000],Equipment:{Armour:"",Weapon:"",Wand:""},Stats:[0,0,0,0],Health:20,Lvl:1,xp:0,Mercenaries:[],Mercenary:{Username:"none"},cash:0,mercUpdate:0};
		}
		else {
			var url="";
			var Url=document.location.href.split("/");
			for(var i=0; i<Url.length-2; i++) {
				url+=Url[i];
				url+="/";
			}
			url+="Home";
			location.href=url;
			return "";
		}
	}
	else {
		return Player={Username:"Sam",Inventory:[],MetaLog:[],Recipes:[],Materials:[57800,57800,57800,57800],Equipment:{Armour:"",Weapon:"",Wand:""},Stats:[0,0,0,0],Health:20,Lvl:1,xp:0,Mercenaries:[],Mercenary:{Username:"none"},cash:0,mercUpdate:0};
	}
}

function lvlUp() {
	Player.xp++;
	Player.Lvl=Math.floor(Math.log(Player.xp)+1);
	Player.Health=Player.Lvl*20;
	playerStats();
	setCookie("data",Player,365000);
}

var adjectiveList=[
	["device",	"lump",	"mist"],
	["sharp",	"",	"dull"],
	["maneuverable",	"",	"bulky"],
	["heavy",	"",	"light"],
	["",	"",	""],
	["large",	"",	"small"],
	["tough",	"",	"fragile"],
	["strong",	"",	"weak"],
	["",	"",	""],
	["glowing",	"",	"dark"],
	["green",	"blue",	"red"],
	["comforting",	"",	"ominous"],
	["nice smelling",	"",	"stinky"],
	["hot",	"",	"cold"],
	["messy",	"",	"ordered"],
	["quick",	"",	"sluggish"],
	["",	"",	""],
	["glistening",	"",	"damaged"],
	["well crafted",	"",	"poor quality"],
	["expert",	"",	"inept"],
	["",	"",	""]
]
function describe(meta) {
	var total="It is a ";
	var foo=meta.split(",");
	for(var i=0; i<foo.length; i++) {
		foo[i]=parseInt(foo[i],16);
	}
	for(var i=1; i<foo.length; i++) {
		var toAdd="";
		if(foo[i]>170) {
			total+=adjectiveList[i][0];
			toAdd=adjectiveList[i][0];
		}
		else if(foo[i]>85) {
			total+=adjectiveList[i][1];
			toAdd=adjectiveList[i][1];
		}
		else {
			total+=adjectiveList[i][2];
			toAdd=adjectiveList[i][2];
		}
		if(toAdd!="") {
			total+=", ";
		}
	}
	if(foo[0]>170) {
		total+=adjectiveList[0][0];
	}
	else if(foo[0]>85) {
		total+=adjectiveList[0][1];
	}
	else {
		total+=adjectiveList[0][2];
	}
	return total;
}




function Roll(number,die,mod,bool,drop) {
	if(typeof number == "undefined" && typeof die == "undefined" && typeof mod == "undefined") {
		console.log("Roll(number,die,mod,bool,drop)");
		return "Roll(number,die,mod,bool,drop)";
	}
	else if(typeof drop=="undefined" || drop==0 || drop==false || drop>die) {
		var dieTotal=0;
		for(var i=0; i<number; i++) {
			dieTotal+=(parseInt(die*Math.random())+1);
		}
		if(bool) {
			dieTotal+=parseInt(Math.pow((parseInt(10*Math.random())+1)/5,2)/2);
		}
		if(dieTotal>(die*number)) {
			dieTotal=die;
		}
		dieTotal+=mod;
		return dieTotal
	}
	else if(drop>0) {
		var dieTotal=0;
		var lowest=[];
		for(var i=0; i<drop; i++) {
			lowest.splice(0,0,die);
		}
		for(var i=0; i<number; i++) {
			temp=(parseInt(die*Math.random())+1);
			dieTotal+=temp;
			for(var j=(lowest.length-1); j>=0; j--) {
				if(temp<=lowest[j]) {
					for(var k=0; k<=j; k++) {
						lowest[k]=lowest[k+1];
					}
					lowest[j]=temp;
					j=0;
				}
			}
		}
		for(var i=0; i<drop; i++) {
			dieTotal-=lowest[i];
		}
		if(bool) {
			dieTotal+=parseInt(Math.pow((parseInt(10*Math.random())+1)/5,2)/2);
		}
		if(dieTotal>(die*number)) {
			dieTotal=die;
		}
		dieTotal+=mod;
		return dieTotal
	}
	else {
		var dieTotal=0;
		var highest=[];
		for(var i=0; i<Math.abs(drop); i++) {
			highest.splice(0,0,0);
		}
		for(var i=0; i<number; i++) {
			temp=(parseInt(die*Math.random())+1);
			dieTotal+=temp;
			for(var j=(highest.length-1); j>=0; j--) {
				if(temp>=highest[j]) {
					for(var k=0; k<=j; k++) {
						highest[k]=highest[k+1];
					}
					highest[j]=temp;
					j=0;
				}
			}
		}
		for(var i=0; i<Math.abs(drop); i++) {
			dieTotal-=highest[i];
		}
		if(bool) {
			dieTotal+=parseInt(Math.pow((parseInt(10*Math.random())+1)/5,2)/2);
		}
		if(dieTotal>(die*number)) {
			dieTotal=die;
		}
		dieTotal+=mod;
		return dieTotal
	}
}

Array.prototype.Lowest = function (property) {
	var temp=[this[0][property],0];
	for (var i=1; i<this.length; i++) {
		if(temp[0]>this[i][property]) {
			temp=[this[i][property],i];
		}
	}
	return temp[1];
}