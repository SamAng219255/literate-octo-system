Range=[[NaN,NaN],[NaN,NaN]];
graphMode="default";
colours=["4400FF","FF4400","44FF00","CC00FF"];
begun=false;
function ShowGraph(range,precision,funcs) {
	if(graphMode=="default") {
		Range=range;
		/*if(checkIfLegal(funcs[0]) && funcs[0]!="") {
			eval("function f(x) {y=("+funcs[0]+"); return y}");
		}
		else if(checkIfLegal(funcs[0])) {
			eval("function f(x) {return 0}");
		}
		else {
			alert("WARNING!: Illegal String.");
			return
		}
		if(checkIfLegal(funcs[1]) && funcs[1]!="") {
			eval("function g(x) {y=("+funcs[1]+"); return y}");
			
		}
		else if(checkIfLegal(funcs[1])) {
			eval("function g(x) {return 0}");
		}
		else {
			alert("WARNING!: Illegal String.");
			return
		}
		if(checkIfLegal(funcs[2]) && funcs[2]!="") {
			eval("function h(x) {y=("+funcs[2]+"); return y}");
			
		}
		else if(checkIfLegal(funcs[2])) {
			eval("function h(x) {return 0}");
		}
		else {
			alert("WARNING!: Illegal String.");
			return
		}
		if(checkIfLegal(funcs[3]) && funcs[3]!="") {
			eval("function e(x) {y=("+funcs[3]+"); return y}");
		}
		else if(checkIfLegal(funcs[3])) {
			eval("function e(x) {return 0}");
		}
		else {
			alert("WARNING!: Illegal String.");
			return
		}
		funcTable=[[],[],[],[]];
		ctx.beginPath();
		ctx.clearRect(0,0,500,500);
		if(inInterval(0,range[1])) {
			ctx.strokeStyle="black";
			ctx.lineWidth=4;
			point=convertPoint([0,range[1][0]],range);
			ctx.moveTo(point[0],point[1]);
			point=convertPoint([0,range[1][1]],range);
			ctx.lineTo(point[0],point[1]);
		}
		if(inInterval(0,range[0])) {
			ctx.strokeStyle="black";
			ctx.lineWidth=4;
			point=convertPoint([range[0][0],0],range);
			ctx.moveTo(point[0],point[1]);
			point=convertPoint([range[0][1],0],range);
			ctx.lineTo(point[0],point[1]);
		}
		ctx.stroke();
		ctx.lineWidth=2;
		if(funcs[0]!="") {
			ctx.beginPath();
			ctx.strokeStyle="#4400FF";
			var point=convertPoint([range[0][0],f(range[0][0])],range);
			ctx.moveTo(point[0],point[1]);
			var unit = (range[0][1]-range[0][0])/precision;
			for(var x=range[0][0]+unit; x<=range[0][1]; x+=unit) {
				point=convertPoint([x,f(x)],range)
				ctx.lineTo(point[0],point[1]);
				funcTable[0].push([x,f(x)]);
			}
			ctx.stroke();
		}
		if(funcs[1]!="") {
			ctx.beginPath();
			ctx.strokeStyle="#FF4400";
			var point=convertPoint([range[0][0],g(range[0][0])],range);
			ctx.moveTo(point[0],point[1]);
			var unit = (range[0][1]-range[0][0])/precision;
			for(var x=range[0][0]+unit; x<=range[0][1]; x+=unit) {
				point=convertPoint([x,g(x)],range)
				ctx.lineTo(point[0],point[1]);
				funcTable[1].push([x,g(x)]);
			}
			ctx.stroke();
		}
		if(funcs[2]!="") {
			ctx.beginPath();
			ctx.strokeStyle="#44FF00";
			var point=convertPoint([range[0][0],h(range[0][0])],range);
			ctx.moveTo(point[0],point[1]);
			var unit = (range[0][1]-range[0][0])/precision;
			for(var x=range[0][0]+unit; x<=range[0][1]; x+=unit) {
				point=convertPoint([x,h(x)],range)
				ctx.lineTo(point[0],point[1]);
				funcTable[2].push([x,h(x)]);
			}
			ctx.stroke();
		}
		if(funcs[3]!="") {
			ctx.beginPath();
			ctx.strokeStyle="#CC00FF";
			var point=convertPoint([range[0][0],e(range[0][0])],range);
			ctx.moveTo(point[0],point[1]);
			var unit = (range[0][1]-range[0][0])/precision;
			for(var x=range[0][0]+unit; x<=range[0][1]; x+=unit) {
				point=convertPoint([x,e(x)],range)
				ctx.lineTo(point[0],point[1]);
				funcTable[3].push([x,e(x)]);
			}
			ctx.stroke();
		}*/
		funcTable=[[],[],[],[]];
		ctx.beginPath();
		ctx.clearRect(0,0,500,500);
		if(inInterval(0,range[1])) {
			ctx.strokeStyle="black";
			ctx.lineWidth=4;
			point=convertPoint([0,range[1][0]],range);
			ctx.moveTo(point[0],point[1]);
			point=convertPoint([0,range[1][1]],range);
			ctx.lineTo(point[0],point[1]);
		}
		if(inInterval(0,range[0])) {
			ctx.strokeStyle="black";
			ctx.lineWidth=4;
			point=convertPoint([range[0][0],0],range);
			ctx.moveTo(point[0],point[1]);
			point=convertPoint([range[0][1],0],range);
			ctx.lineTo(point[0],point[1]);
		}
		ctx.stroke();
		ctx.lineWidth=2;
		for(var i=0; i<4; i++) {
			if(funcs[i]!="") {
				addFunc(funcs[i],String.fromCharCode(97+i));
				ctx.beginPath();
				ctx.strokeStyle="#"+colours[i];
				var point=convertPoint([range[0][0],parseMath(funcs[i],"x",range[0][0])],range);
				ctx.moveTo(point[0],point[1]);
				var unit = (range[0][1]-range[0][0])/precision;
				for(var x=range[0][0]+unit; x<=range[0][1]; x+=unit) {
					point=convertPoint([x,parseMath(funcs[i],"x",x)],range)
					ctx.lineTo(point[0],point[1]);
					funcTable[i].push([x,parseMath(funcs[i],"x",x)]);
				}
				ctx.stroke();
			}
			else {
				delete Math[String.fromCharCode(97+i)];
			}
		}
	}
	else if(graphMode=="Parametric") {
		Range=range;
		/*if(checkIfLegal(funcs[0][0]) && checkIfLegal(funcs[1][0]) && funcs[0][0]!="" && funcs[1][0]!="") {
			eval("function f(t) {y=("+funcs[1][0]+"); x=("+funcs[0][0]+"); return [x,y]}");
		}
		else if(checkIfLegal(funcs[0][0]) && checkIfLegal(funcs[1][0])) {
			eval("function f(t) {return [0,0]}");
		}
		else {
			alert("WARNING!: Illegal String.");
			return
		}
		if(checkIfLegal(funcs[0][1]) && checkIfLegal(funcs[1][1]) && funcs[0][1]!="" && funcs[1][1]!="") {
			eval("function g(t) {y=("+funcs[1][1]+"); x=("+funcs[0][1]+"); return [x,y]}");
			
		}
		else if(checkIfLegal(funcs[0][1]) && checkIfLegal(funcs[1][1])) {
			eval("function g(t) {return [0,0]}");
		}
		else {
			alert("WARNING!: Illegal String.");
			return
		}
		if(checkIfLegal(funcs[0][2]) && checkIfLegal(funcs[1][2]) && funcs[0][2]!="" && funcs[1][2]!="") {
			eval("function h(t) {y=("+funcs[1][2]+"); x=("+funcs[0][2]+"); return [x,y]}");
			
		}
		else if(checkIfLegal(funcs[0][2]) && checkIfLegal(funcs[1][2])) {
			eval("function h(t) {return [0,0]}");
		}
		else {
			alert("WARNING!: Illegal String.");
			return
		}
		if(checkIfLegal(funcs[0][3]) && checkIfLegal(funcs[1][3]) && funcs[0][3]!="" && funcs[1][3]!="") {
			eval("function e(t) {y=("+funcs[1][3]+"); x=("+funcs[0][3]+"); return [x,y]}");
		}
		else if(checkIfLegal(funcs[0][3]) && checkIfLegal(funcs[1][3])) {
			eval("function e(t) {return [0,0]}");
		}
		else {
			alert("WARNING!: Illegal String.");
			return
		}
		funcTable=[[],[],[],[]];
		ctx.beginPath();
		ctx.clearRect(0,0,500,500);
		if(inInterval(0,range[1])) {
			ctx.strokeStyle="black";
			ctx.lineWidth=4;
			point=convertPoint([0,range[1][0]],range);
			ctx.moveTo(point[0],point[1]);
			point=convertPoint([0,range[1][1]],range);
			ctx.lineTo(point[0],point[1]);
		}
		if(inInterval(0,range[0])) {
			ctx.strokeStyle="black";
			ctx.lineWidth=4;
			point=convertPoint([range[0][0],0],range);
			ctx.moveTo(point[0],point[1]);
			point=convertPoint([range[0][1],0],range);
			ctx.lineTo(point[0],point[1]);
		}
		ctx.stroke();
		ctx.lineWidth=2;
		if(funcs[0][0]!="" && funcs[1][0]) {
			ctx.beginPath();
			ctx.strokeStyle="#4400FF";
			var point=convertPoint(f(parseFloat(document.getElementById("tStart").value)),range);
			ctx.moveTo(point[0],point[1]);
			var unit = (parseFloat(document.getElementById("tEnd").value)-parseFloat(document.getElementById("tStart").value))/precision;
			for(var t=parseFloat(document.getElementById("tStart").value)+unit; t<=parseFloat(document.getElementById("tEnd").value); t+=unit) {
				point=convertPoint(f(t),range)
				ctx.lineTo(point[0],point[1]);
				funcTable[0].push(f(t));
			}
			ctx.stroke();
		}
		if(funcs[0][1]!="" && funcs[1][1]) {
			ctx.beginPath();
			ctx.strokeStyle="#FF4400";
			var point=convertPoint(g(parseFloat(document.getElementById("tStart").value)),range);
			ctx.moveTo(point[0],point[1]);
			var unit = (parseFloat(document.getElementById("tEnd").value)-parseFloat(document.getElementById("tStart").value))/precision;
			for(var t=parseFloat(document.getElementById("tStart").value)+unit; t<=parseFloat(document.getElementById("tEnd").value); t+=unit) {
				point=convertPoint(g(t),range)
				ctx.lineTo(point[0],point[1]);
				funcTable[0].push(g(t));
			}
			ctx.stroke();
		}
		if(funcs[0][2]!="" && funcs[1][2]) {
			ctx.beginPath();
			ctx.strokeStyle="#44FF00";
			var point=convertPoint(h(parseFloat(document.getElementById("tStart").value)),range);
			ctx.moveTo(point[0],point[1]);
			var unit = (parseFloat(document.getElementById("tEnd").value)-parseFloat(document.getElementById("tStart").value))/precision;
			for(var t=parseFloat(document.getElementById("tStart").value)+unit; t<=parseFloat(document.getElementById("tEnd").value); t+=unit) {
				point=convertPoint(h(t),range)
				ctx.lineTo(point[0],point[1]);
				funcTable[0].push(h(t));
			}
			ctx.stroke();
		}
		if(funcs[0][3]!="" && funcs[1][3]) {
			ctx.beginPath();
			ctx.strokeStyle="#CC00FF";
			var point=convertPoint(e(parseFloat(document.getElementById("tStart").value)),range);
			ctx.moveTo(point[0],point[1]);
			var unit = (parseFloat(document.getElementById("tEnd").value)-parseFloat(document.getElementById("tStart").value))/precision;
			for(var t=parseFloat(document.getElementById("tStart").value)+unit; t<=parseFloat(document.getElementById("tEnd").value); t+=unit) {
				point=convertPoint(e(t),range)
				ctx.lineTo(point[0],point[1]);
				funcTable[0].push(e(t));
			}
			ctx.stroke();
		}*/
		funcTable=[[],[],[],[]];
		ctx.beginPath();
		ctx.clearRect(0,0,500,500);
		if(inInterval(0,range[1])) {
			ctx.strokeStyle="black";
			ctx.lineWidth=4;
			point=convertPoint([0,range[1][0]],range);
			ctx.moveTo(point[0],point[1]);
			point=convertPoint([0,range[1][1]],range);
			ctx.lineTo(point[0],point[1]);
		}
		if(inInterval(0,range[0])) {
			ctx.strokeStyle="black";
			ctx.lineWidth=4;
			point=convertPoint([range[0][0],0],range);
			ctx.moveTo(point[0],point[1]);
			point=convertPoint([range[0][1],0],range);
			ctx.lineTo(point[0],point[1]);
		}
		ctx.stroke();
		ctx.lineWidth=2;
		for(var i=0; i<4; i++) {
			if(funcs[0][i]!="" && funcs[1][i]!="") {
				addFuncs([funcs[0][i],funcs[1][i]],String.fromCharCode(97+i));
				ctx.beginPath();
				ctx.strokeStyle="#"+colours[i];
				var point=convertPoint([parseMath(funcs[0][i],"t",parseFloat(document.getElementById("tStart").value)),parseMath(funcs[1][i],"t",parseFloat(document.getElementById("tStart").value))],range);
				ctx.moveTo(point[0],point[1]);
				var unit = (parseFloat(document.getElementById("tEnd").value)-parseFloat(document.getElementById("tStart").value))/precision;
				for(var t=parseFloat(document.getElementById("tStart").value)+unit; t<=parseFloat(document.getElementById("tEnd").value); t+=unit) {
					point=convertPoint([parseMath(funcs[0][i],"t",t),parseMath(funcs[1][i],"t",t)],range)
					ctx.lineTo(point[0],point[1]);
					funcTable[i].push([parseMath(funcs[0][i],"t",t),parseMath(funcs[1][i],"t",t)]);
				}
				ctx.stroke();
			}
		}
	}
}
function graphButton() {
	if(Math.floor(parseFloat(document.getElementById("rangeA2").value))>parseFloat(document.getElementById("rangeA1").value) &&
		 Math.floor(parseFloat(document.getElementById("rangeB2").value))>parseFloat(document.getElementById("rangeB1").value)) {
		canvas.removeEventListener("mousedown", check, false);
		canvas.removeEventListener("mousemove", check, false);
		canvas.addEventListener(document.getElementById("detectMode").value, check, false);
		begun=true;
		if(graphMode=="default") {
			ShowGraph(
				[
					[parseFloat(document.getElementById("rangeA1").value),parseFloat(document.getElementById("rangeA2").value)],
					[parseFloat(document.getElementById("rangeB1").value),parseFloat(document.getElementById("rangeB2").value)]
				],
				parseFloat(document.getElementById("Precise").value),
				[document.getElementById("JsMFunc1").value,document.getElementById("JsMFunc2").value,document.getElementById("JsMFunc3").value,document.getElementById("JsMFunc4").value]
			);
		}
		else {
			ShowGraph(
				[
					[parseFloat(document.getElementById("rangeA1").value),parseFloat(document.getElementById("rangeA2").value)],
					[parseFloat(document.getElementById("rangeB1").value),parseFloat(document.getElementById("rangeB2").value)]
				],
				parseInt(document.getElementById("Precise").value),
				[
					[document.getElementById("JsMFunc1").value,document.getElementById("JsMFunc2").value,document.getElementById("JsMFunc3").value,document.getElementById("JsMFunc4").value],
					[document.getElementById("JsMFunc1b").value,document.getElementById("JsMFunc2b").value,document.getElementById("JsMFunc3b").value,document.getElementById("JsMFunc4b").value]
				]
			);
		}
	}
	else {
		alert("Improper Range");
	}
}
function addFunc(bar,name) {Math[name] = function (x) {return parseMath(bar,"x",x)}};
function addFuncs(bar,name) {Math[name] = function (t) {return [parseMath(bar[0],"t",t),parseMath(bar[0],"t",t)]}};
function check(event) {
	graphButton();
	var xPos=[event.x-(canvas.offsetLeft-document.getElementById("body").scrollLeft),event.y-(canvas.offsetTop-document.getElementById("body").scrollTop)];
	var temp=unconvertPoint(xPos,Range);
	var yPos=temp[1];
	xPos[1]=temp[0]
	if(document.getElementById("detectType").value=="near") {
		var near=0;
		var resultTable=funcTable[document.getElementById("funcLetter").value.charCodeAt()-97];
		var pullTable=[];
		pullTable.length=resultTable.length;
		pullTable[0]=Math.sqrt(Math.pow(resultTable[0][0]-xPos[1],2)+Math.pow(resultTable[0][1]-yPos,2));
		for(var i=1; i<pullTable.length; i++) {
			pullTable[i]=Math.sqrt(Math.pow(resultTable[i][0]-xPos[1],2)+Math.pow(resultTable[i][1]-yPos,2));
			if(pullTable[near]>pullTable[i]) {
				near=i;
			}
		}
		xPos[1]=resultTable[near][0];
		yPos=resultTable[near][1];
	}
	if(document.getElementById("roundType").value=="zero") {
		xPos[1]=Math.approximateZero(Math[document.getElementById("funcLetter").value],xPos[1]);
	}
	else if(document.getElementById("roundType").value=="intersect") {
		var temp=[Infinity,Infinity,Infinity,Infinity];
		for(var i=0; i<4; i++) {
			if(Math[String.fromCharCode(97+i)]!=undefined && String.fromCharCode(97+i)!=document.getElementById("funcLetter").value) {
				temp[i]=Math.approximateZero(function (x) {return Math[document.getElementById("funcLetter").value](x)-Math[String.fromCharCode(97+i)](x)},xPos[1])
			}
		}
		var lowest=0;
		for(var i=1; i<4; i++) {
			if(Math.abs(temp[lowest]-xPos[1])>Math.abs(temp[i]-xPos[1])) {
				lowest=i;
			}
		}
		xPos[1]=temp[lowest];
	}
	if(graphMode=="default") {
		point=convertPoint([xPos[1],Math[document.getElementById("funcLetter").value](xPos[1])],Range);
	}
	else {
		point=convertPoint([xPos[1],yPos],Range);
	}
	drawCircle(point[0],point[1],4,"#"+colours[document.getElementById("funcLetter").value.charCodeAt()-97]);
	ctx.font="20px Ariel";
	ctx.fillText("("+Math.round(10000*unconvertPoint(point,Range)[0])/10000+","+Math.round(10000*unconvertPoint(point,Range)[1])/10000+")",point[0],point[1]);
	//console.log("("+Math.round(10000*unconvertPoint(point,Range)[0])/10000+","+Math.round(10000*unconvertPoint(point,Range)[1])/10000+")");
}
function drawCircle(xPos,yPos,radius,color) {
	ctx.beginPath()
	ctx.fillStyle=color;
	ctx.arc(xPos, yPos, radius, 0, 2*Math.PI, true);
	ctx.fill();
}
function switchTranslate() {
	switchMode(document.getElementById("graphMode").value);
	canvas.removeEventListener("mousedown", check, false);
	canvas.removeEventListener("mousemove", check, false);
}
function switchMode(mode) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("funcs").innerHTML = this.responseText;
		}
	};
	xhttp.open("GET", mode+".txt", true);
	xhttp.send();
	//document.getElementById("funcs").innerHTML = prompt();
	graphMode=mode;
	if(graphMode=="default") {
		document.getElementById("roundType").innerHTML="\n<option value=\"none\">None</option>\n<option value=\"zero\">Zero</option>\n<option value=\"intersect\">Intersection</option>\n";
	}
	else {
		document.getElementById("roundType").innerHTML="\n<option value=\"none\">Disabled</option>\n"
	}
}