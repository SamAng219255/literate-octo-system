var UCAsize=20;
function canvasSetup() {
	canvas=document.getElementById("MapBox")
	ctx=canvas.getContext("2d");
	ctx.beginPath();
	canvas.addEventListener("mousedown", activate, false);
}
function activate(event) {
	x=Math.floor((event.x-(canvas.offsetLeft+document.getElementById("center").offsetLeft-document.getElementById("content").scrollLeft))/UCAsize);
	y=Math.floor((event.y-(canvas.offsetTop+Math.round(screen.height/20)-document.getElementById("content").scrollTop-document.getElementById("center").scrollTop-4))/UCAsize);
	if(foo[x][y]) {
		foo[x][y]=false;
	}
	else {
		foo[x][y]=true;
	}
	showLife(foo);
}
function round(map) {
	var mapLength1=map.length;
	var mapLength2=map[0].length;
	var endMap=[];
	for(var i=0; i<mapLength1; i++) {
		endMap=addToArray(endMap,[]);
		for(var j=0; j<mapLength2; j++) {
			var numRound=numAround(map,i,j);
			if(numRound==2) {
				endMap[i]=addToArray(endMap[i],map[i][j]);
			}
			else if(numRound==3) {
				endMap[i]=addToArray(endMap[i],true);
			}
			else {
				endMap[i]=addToArray(endMap[i],false);
			}
		}
	}
	return endMap;
}
function numAround(map,a,b) {
	var numRound=0;
	for(var i=(-1); i<=1; i++) {
		for(var j=(-1); j<=1; j++) {
			var pos=[a+i,b+j];
			/*if(pos[0]>=0 && pos[1]>=0 && (pos[0]!=a || pos[1]!=b) && (map.length-pos[0])>0 && (map[0].length-pos[1])>0) {
				if(map[pos[0]][pos[1]]) {
					numRound++;
				}
			}*/
			if(pos[0]!=a || pos[1]!=b) {
				var switched=[true,true];
				if(pos[0]<0) {
					pos[0]=(map.length-1);
				}
				else if(pos[0]>=map.length) {
					pos[0]=0;
				}
				else {
					switched[0]=false;
				}
				if(pos[1]<0) {
					pos[1]=(map[0].length-1);
				}
				else if(pos[1]>=map[0].length) {
					pos[1]=0;
				}
				else {
					switched[1]=false;
				}
				if(switched[1]) {
					pos[0]=(map.length-1)-pos[0];
				}
				if(switched[0]) {
					pos[1]=(map[0].length-1)-pos[1];
				}
				if(map[pos[0]][pos[1]]) {
					numRound++;
				}
			}
		}
	}
	return numRound;
}
function showLife(map) {
	for(var i=0; i<map.length; i++) {
		for(var j=0; j<map[0].length; j++) {
			if(map[i][j]) {
				ctx.fillStyle="black";
			}
			else {
				ctx.fillStyle="white";
			}
			ctx.fillRect(UCAsize*i,UCAsize*j,UCAsize,UCAsize)
		}
	}
}
function setGrid(size) {
	var map=[];
	for(var i=0; i<size; i++) {
		map=addToArray(map,[]);
		for(var j=0; j<size; j++) {
			map[i]=addToArray(map[i],false)
		}
	}
	foo=map;
}
var foo;
function lifer() {foo=round(foo); showLife(foo); console.log("lived"); fooCount++; document.getElementById("fooCounterDiv").innerHTML=fooCount;}
function emptyProto() {
	var outputArray=[];
	for(var i=0; i<Math.floor(900/UCAsize); i++) {
		outputArray=addToArray(outputArray,[]);
		for(var j=0; j<Math.floor(900/UCAsize); j++) {
			outputArray[i]=addToArray(outputArray[i],false)
		}
	}
	return outputArray;
}
function saveFile(url) {
	var filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0];
	var xhr = new XMLHttpRequest();
	xhr.responseType = 'blob';
	xhr.onload = function() {
		var a = document.createElement('a');
		a.href = window.URL.createObjectURL(xhr.response);
		a.download = "GameOfLife.png";
		a.style.display = 'none';
		document.body.appendChild(a);
		a.click();
		delete a;
	};
	xhr.open('GET', url);
	xhr.send();
}
function prepareDownload() {
	if(!loadable) {
		loadable=true;
		var para = document.createElement("a");
		para.setAttribute("download", canvas.toDataURL());
		para.setAttribute("href", canvas.toDataURL());
		para.setAttribute("id", "downloadButton");
		var element = document.getElementById("buttons");
		element.appendChild(para);
		var para = document.createElement("button");
		para.setAttribute("type", "button");
		var node = document.createTextNode("Download Image");
		para.appendChild(node);
		var element = document.getElementById("downloadButton");
		element.appendChild(para);
	}
}
//WIP
/*function empty(dim,mode,dimZ) {
	var outputArray=[];
	function emptyFill(mode) {
		var outputArrayEnd=[];
		if(mode==undefined || mode==1) {
			outputArrayEnd=addToArray(outputArray,undefined)
		}
		else if(mode==2) {
			outputArrayEnd=addToArray(outputArray,false)
		}
		return outputArrayEnd;
	}
	var forTexts=[""," ","",""];
	for(var i=0; i<dimZ; i++) {
		forTexts[0]+="for(var i"+i+"=0; i"+i+"<"+dim[i]+"; i"+i+"++) { ";
		forTexts[1]+="}";
		forTexts[2]+="["+i+"]";
	}
	eval(forTexts[0]+"outpuArray=emptyFill("+mode+")"+forTexts[1]);
	return outputArray;
}*/
