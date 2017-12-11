/*serverData = {versionList:[],keys:{}};
Array.prototype.Rel = function () {
	return JSON.parse(JSON.stringify(this));
}
Object.prototype.Rel = function () {
	return JSON.parse(JSON.stringify(this));
}
function newRandomKey(versions) {
	function newRandom(array,count) {
		var temp=Math.round(Math.random()*count);
		if(array.indexOf(temp)<0) {
			return temp;
	    }
		else {
			return newRandom(array,count);
	    }
	}
	var foo=[];
	for(var i=0; i<36; i++) {
		foo.push(newRandom(foo,36));
	}
	for(var i=0; i<36; i++) {
		foo[i]=Math.pow(2,foo[i]);
	}
	return {version:newRandom(versions,Math.pow(2,64)),key:foo,groupSize:Math.ceil(Math.random()*5)};
}
function pseudoServer(operation,data) {
	if(operation=="key") {
		var temp=newRandomKey(serverData.versionList);
		serverData.keys[temp.version]=temp.Rel();
		serverData.versionList.push(temp.version);
		return temp.Rel();
	}
}
var Player={
	Inventory:[],
	MetaLog:[]
};*/