h=Math.pow(10,-10);
Math.derivative = function (f,x) {
	return Math.round(10000*(parseMath(f,"x",x+0.001)-parseMath(f,"x",x-0.001))/(2*0.001))/10000;
}
Math.integral = function (xfunction,interval,number,RAMtype) {
	if(typeof xfunction == "undefined" && typeof interval == "undefined" && typeof number == "undefined" && typeof RAMtype == "undefined") {
		return "integral(xfunction,interval,number,RAMtype)";
	}
	else {
		if(number<10000000) {
			eval("function f(x) {y=("+xfunction+");return y;}");
			var unit=Math.abs((interval[1]-interval[0])/number);
			var rTotal=0;
			var lTotal=0;
			for(var i=Math.min(interval[0],interval[interval.length-1]); i<Math.max(interval[0],interval[interval.length-1]); i+=unit) {
				lTotal+=(f(i)*unit);
			}
			for(var i=(Math.min(interval[0],interval[interval.length-1])+unit); i<=Math.max(interval[0],interval[interval.length-1]); i+=unit) {
				rTotal+=(f(i)*unit);
			}
			var outsert=0;
			if(typeof RAMtype == "undefined" || RAMtype=="AVG") {
				outsert=(rTotal+lTotal)/2;
			}
			else if(RAMtype=="r") {
				outsert=rTotal;
			}
			else if(RAMtype=="l") {
				outsert=lTotal;
			}
			outsert=parseInt(1000000000*outsert)/1000000000;
			return outsert;
		}
		else {
			return null;
		}
	}
}
Math.tripleIntegral = function (xfunction,interval,number,x,y,z) {
	if(typeof xfunction == "undefined" && typeof interval == "undefined" && typeof number == "undefined" && typeof x == "undefined" && typeof y == "undefined" && typeof z == "undefined") {
		return "integral(xfunction,interval,number,x,y,z)";
	}
	else {
		if(number<10000000) {
			eval("function f("+x+","+y+","+z+") {y=("+xfunction+");return y;}");
			var unit=(interval[1]-interval[0])/number
			var rTotal=0;
			var lTotal=0;
			for(var i=interval[0]; i<interval[1]; i+=unit) {
				for(var j=interval[0]; j<interval[1]; j+=unit) {
					for(var k=interval[0]; k<interval[1]; k+=unit) {
						rTotal+=(f(i,j,k)*unit);
					}
				}
			}
			for(var i=(interval[0]+unit); i<=interval[1]; i+=unit) {
				for(var j=(interval[0]+unit); j<=interval[1]; j+=unit) {
					for(var k=(interval[0]+unit); k<=interval[1]; k+=unit) {
						lTotal+=(f(i,j,k)*unit);
					}
				}
			}
			var outsert=0;
			outsert=(rTotal+lTotal)/2;
			outsert=parseInt(1000000000*outsert)/1000000000;
			return outsert;
		}
		else {
			return null;
		}
	}
}
function AM(x,carryAmp,carryFreq,amp,freq) {
	return (carryAmp*Math.sin((2*Math.PI*x)/carryFreq))*(amp*Math.cos((2*Math.PI*x)/freq));
}
function FM(x,carryAmp,carryFreq,amp,freq) {
	return carryAmp*Math.sin(((2*Math.PI*x)/carryFreq)+(amp*Math.cos((4*Math.PI*x)/freq)));
}
function DM(x,carryAmp,carryFreq,amp,freq) {
	return (carryAmp*Math.sin(((2*Math.PI*x)/carryFreq)+(amp*Math.cos((4*Math.PI*x)/freq))))*(amp*Math.cos((2*Math.PI*x)/freq));
}
function matrixMulti(matrix1,matrix2) {
	var matrix3=[];
	for(var i=0; i<matrix1[0].length; i++) {
		matrix3.push([]);
		for(var j=0; j<matrix2[0].length; j++) {
			matrix3[i].push(0);
		}
	}
	for(var i=0; i<matrix1[0].length; i++) {
		for(var j=0; j<matrix2[0].length; j++) {
			for(var k=0; k<matrix1.length; k++) {
				matrix3[j][i]+=matrix1[j][k]*matrix2[k][i];
			}
		}
	}
	return matrix3;
}
function sum(func,range) {
	var count=0;
	eval("function f(x) {y=("+func+"); return y;}");
	for(var i=min(range[0],range[1]); i<=max(range[0],range[1]); i++) {
		count+=f(i);
    }
	return count;
}
Math.gameXP = function (Level) {return Math.log(Math.pow(Math.E,Level)*integral("(Math.log(2)*Math.pow(x,Math.log(4/3)/Math.log(3/2)))/Math.log(3/2)",[Level-1,Level],1000))}
Array.prototype.Rel = function () {
	return JSON.parse(JSON.stringify(this));
}
Object.prototype.Rel = function () {
	return JSON.parse(JSON.stringify(this));
}
function approxZeroStep(func,x,h) {
	return (x-(func(x)/((func(x+h)-func(x-h))/(2*h))));
}
Math.approximateZero = function (func,start) {
	var current=approxZeroStep(func,start,0.001);
	var last=start;
	var rounds=0;
	while((Math.abs(current-last)>0.01 || func(current)>0.0001) && rounds<1000) {
		last=current;
		current=approxZeroStep(func,current,0.001);
		rounds++;
	}
	return current;
}