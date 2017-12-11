//var degreE=0
gravSystem={};
physicsInterval=40;
opticalBoundary=1;
opticalCenter=[0,0];
G=196;
Time=0;
temporalMod=1;
function physics() {
	for(orbiter in gravSystem) {
		if(!gravSystem[orbiter].still) {
			for(puller in gravSystem) {
				if(puller!==orbiter && !gravSystem[orbiter].still) {
					var currentOrbiter=gravSystem[orbiter];
					var currentPuller=gravSystem[puller];
					var deltaX=currentOrbiter.xPos-currentPuller.xPos;
					var deltaY=currentOrbiter.yPos-currentPuller.yPos;
					var vel=40*(G*currentPuller.mass/(Math.pow(deltaX,2)+Math.pow(deltaY,2)))/physicsInterval;
					var xVect=(vel/Math.sqrt(Math.pow(deltaY/deltaX,2)+1));
					var yVect=(vel*(deltaY/deltaX)/Math.sqrt(Math.pow(deltaY/deltaX,2)+1));
					var Xvel;
					var Yvel;
					if(deltaX>=0) {
						Xvel=-xVect;
					}
					else if(deltaX<0) {
						Xvel=xVect;
					}
					if(deltaX>0) {
						Yvel=-yVect;
					}
					else if(deltaX<0) {
						Yvel=yVect;
					}
					else if(deltaX=0) {
						Yvel=Math.sign(-deltaY);
					}
					gravSystem[orbiter].xVel+=Xvel;
					gravSystem[orbiter].yVel+=Yvel;
				}
			}
		}
	}
	for(orbiter in gravSystem) {
		if(!gravSystem[orbiter].still) {
			gravSystem[orbiter].xPos+=(gravSystem[orbiter].xVel/physicsInterval);
			gravSystem[orbiter].yPos+=(gravSystem[orbiter].yVel/physicsInterval);
		}
	}
	for(orbiter in gravSystem) {
		for(puller in gravSystem) {
			if(puller!==orbiter) {
				var currentOrbiter=gravSystem[orbiter];
				var currentPuller=gravSystem[puller];
				var deltaX=currentOrbiter.xPos-currentPuller.xPos;
				var deltaY=currentOrbiter.yPos-currentPuller.yPos;
				var delta=Math.sqrt(Math.pow(deltaY,2)+Math.pow(deltaX,2))
				if(delta<=(currentOrbiter.radius+currentPuller.radius)) {
					if((currentOrbiter.mass>=currentPuller.mass || currentOrbiter.still) && (!currentPuller.still || currentOrbiter.still)) {
						larger=orbiter;
						smaller=puller;
					}
					else {
						larger=puller;
						smaller=orbiter;
					}
					if(!gravSystem[larger].still) {
						eval("gravSystem."+larger+
							"={mass:"+(currentOrbiter.mass+currentPuller.mass)+
							",radius:"+Math.sqrt(Math.pow(currentOrbiter.radius,2)+Math.pow(currentPuller.radius,2))+
							",xPos:"+(currentOrbiter.radius*currentOrbiter.xPos+currentPuller.radius*currentPuller.xPos)/(currentOrbiter.radius+currentPuller.radius)+
							",yPos:"+(currentOrbiter.radius*currentOrbiter.yPos+currentPuller.radius*currentPuller.yPos)/(currentOrbiter.radius+currentPuller.radius)+
							",xVel:"+(currentOrbiter.mass*currentOrbiter.xVel+currentPuller.mass*currentPuller.xVel)/(currentOrbiter.mass+currentPuller.mass)+
							",yVel:"+(currentOrbiter.mass*currentOrbiter.yVel+currentPuller.mass*currentPuller.yVel)/(currentOrbiter.mass+currentPuller.mass)+
							",color:\""+gravSystem[larger].color+
						"\",still:"+gravSystem[larger].still+"}");
					}
					else {
						eval("gravSystem."+larger+
							"={mass:"+(currentOrbiter.mass+currentPuller.mass)+
							",radius:"+gravSystem[larger].radius+
							",xPos:"+gravSystem[larger].xPos+
							",yPos:"+gravSystem[larger].yPos+
							",xVel:"+gravSystem[larger].xVel+
							",yVel:"+gravSystem[larger].yVel+
							",color:\""+gravSystem[larger].color+
						"\",still:"+gravSystem[larger].still+"}");
					}
					removeOrbiter(smaller);
					transmit(larger+" has collided with "+smaller+".",Time);
				}
			}
		}
	}
}
function displayOrbiter() {
	clearView();
	for(orbiter in gravSystem) {
		var currentObject=gravSystem[orbiter];
		drawCircle(((currentObject.xPos-opticalCenter[0])/opticalBoundary)+250,((currentObject.yPos-opticalCenter[1])/opticalBoundary)+250,currentObject.radius/opticalBoundary,currentObject.color);
	}
}
function startOrbits() {
	Time=0;
	sessionNum=setInterval(orbit,(1000/(physicsInterval*temporalMod)));
}
function stopOrbits() {
	for(var i=0; i<=sessionNum; i++) {
		clearInterval(i);
	}
}
function zoomOut() {
	opticalBoundary*=1.5;
	displayOrbiter();
}
function zoomIn() {
	opticalBoundary/=1.5;
	displayOrbiter();
}
function createOrbiter() {
	if(typeof document.getElementById("orbiterName").value!=="undefined" && eval("typeof gravSystem."+document.getElementById("orbiterName").value)==="undefined") {
		eval("gravSystem."+document.getElementById("orbiterName").value+
			"={mass:"+document.getElementById("mass").value+
			",radius:"+document.getElementById("radius").value+
			",xPos:"+document.getElementById("xPos").value+
			",yPos:"+document.getElementById("yPos").value+
			",xVel:"+document.getElementById("xVel").value+
			",yVel:"+document.getElementById("yVel").value+
			",color:\""+document.getElementById("color").value+
		"\",still:"+document.getElementById("still").checked+"}");
	}
	displayOrbiter();
}
function removeOrbiter(orbiter) {
	delete gravSystem[orbiter];
	displayOrbiter();
}
function removeOrbiterKey() {
	delete gravSystem[document.getElementById("orbiterName").value];
	displayOrbiter();
}
function draw() {
	canvas=document.getElementById("viewPort");
	ctx=canvas.getContext("2d");
	ctx.beginPath();
	/*
	ctx.fillStyle="#00FC12";
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.arc(250, 250, 125, 0, 2*Math.PI, true);
	ctx.fill();
	*//*
	function orbit() {
		degreE+=(2*Math.PI/(160*4));
		clearView();
		drawCircle(250,250,40,"FFFF88");
		drawCircle(200*Math.sin(degreE)+250,-200*Math.cos(degreE)+250,10,"00CC44")
	}
	foo=setInterval(orbit,1);
	*/
}
function clearView() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function drawCircle(xPos,yPos,radius,color) {
	ctx.beginPath()
	ctx.fillStyle=color;
	ctx.arc(xPos, yPos, radius, 0, 2*Math.PI, true);
	ctx.fill();
}
function orbit() {
	Time+=(1/physicsInterval);
	physics();
	displayOrbiter();
	/*
	degreE+=(2*Math.PI/(160*4));
	clearView();
	drawCircle(250,250,40,"FFFF88");
	drawCircle(200*Math.sin(degreE)+250,-200*Math.cos(degreE)+250,10,"00CC44")
	*/
}
function transmit(message,time) {
	minute=Math.floor(time/60);
	Ttime=(minute+":"+Math.floor(1000*(time-(minute*60)))/1000);
	var para = document.createElement("p");
	var node = document.createTextNode(Ttime+" | "+message);
	para.appendChild(node);
	var element = document.getElementById("log");
	element.appendChild(para);
	element.scrollTop = element.scrollHeight;
}
function keyPressed(e) {
	if(e.keyCode==37) {
		opticalCenter[0]-=opticalBoundary*500/6;
		displayOrbiter();
	}
	else if(e.keyCode==38) {
		opticalCenter[1]-=opticalBoundary*500/6;
		displayOrbiter();
	}
	else if(e.keyCode==39) {
		opticalCenter[0]+=opticalBoundary*500/6;
		displayOrbiter();
	}
	else if(e.keyCode==40) {
		opticalCenter[1]+=opticalBoundary*500/6;
		displayOrbiter();
	}
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
function outputGrav() {
	document.getElementById("output").value=translateToString(gravSystem);
}
function inputGrav() {
	eval("gravSystem="+document.getElementById("input").value);
	displayOrbiter();
}


//gravSystem={Earth:{color:"#00FF88",mass:81,radius:20,xPos:880,yPos:0,xVel:0,yVel:240},Sun:{color:"#FFFF88",mass:6561,radius:240,xPos:0,yPos:0,xVel:0,yVel:-3},Moon:{color:"#FFFFFF",mass:1,radius:5,xPos:910,yPos:0,xVel:0,yVel:400}}
//gravSystem={Sun:{mass:162,color:"#FFFF88",radius:40,xPos:0,yPos:0,xVel:-0.25,yVel:-3.5},Earth:{mass:4,color:"#00FF88",radius:10,xPos:100,yPos:0,xVel:0,yVel:120},Mars:{mass:1,color:"#880000",radius:5,xPos:350,yPos:0,xVel:0,yVel:60}}
