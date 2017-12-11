Math.integral = function (func,range,units) {
	var unit=(range[1]-range[0])/units;
	var total=func(range[0]);
	for(var i=(range[0]+unit); i<(range[1]-(unit/2)); i+=unit) {
		total+=(func(i)*2);
	}
	total+=ignore(func(range[1]));
	total*=(unit/2);
	return total;
}
Math.derivative = function (func,x,h) {
	return (func(x+h)-func(x-h))/(2*h);
}
/*Math.multiIntegral = function (func,ranges,units) { //WIP
	var unit=[];
	var list=[];
	for(var i=0; i<ranges.length; i++) {
		unit.push((ranges[i][1]-ranges[i][0])/units);
		list.push(ranges[i][0])
	}
	var total=ignore(func(list));
	total+=Math.multiIntegralPart(func,ranges,unit,0,[]);
	var list=[];
	for(var i=0; i<ranges.length; i++) {
		list.push(ranges[i][1])
	}
	total+=ignore(func(list));
	total*=Math.prod(unit);
	total/=Math.pow(2,ranges.length);
	return total;
}
Math.multiIntegralPart = function (func,ranges,unit,depth,progress) {
	if(depth<ranges.length) {
		var total=0;
		for(var i=(ranges[depth][0]+unit[depth]); i<(ranges[depth][1]-(unit[depth]/2)); i+=unit[depth]) {
			var Progress=progress;
			Progress.push(i);
			total+=Math.multiIntegralPart(func,ranges,unit,depth+1,Progress);
		}
		return total;
	}
	else {
		return ignore((func(progress)*2));
	}
}*/
Math.prod = function (list) {
	var total=1;
	for(var i=0; i<list.length; i++) {
		total*=list[i]
	}
	return total;
}
Math.sum = function (list) {
	var total=0;
	for(var i=0; i<list.length; i++) {
		total+=list[i]
	}
	return total;
}
function ignore(value) {
	if(isNaN(value)) {
		return 0;
	}
	else {
		return value;
	}
}