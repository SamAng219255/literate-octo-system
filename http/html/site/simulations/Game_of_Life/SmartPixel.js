function smartRound(smartMap) {
	mapLength=smartMap[0].length;
	effectLength=smartMap[1].length;
	endMap=smartMap[0];
	endEffectMap=smartMap[1]
	for(var i=0; i<effectLength; i++) {
		var around=smartNumAround(smartMap[0],smartMap[1][i].a,smartMap[1][i].b);
		if(around==2) {} else if(around==3){
			if(smartMap[1].indexOf(smartMap[1][i])==-1) {//what?
				endMap.push(smartMap[1][i]);
				for(var j=-1; j<=1; j++) {
					for(var k=-1; k<=1; k++) {
						jkPos={a:(smartMap[1][i]+j),b:(smartMap[1][i]+k)};
						if(smartMap[1].indexOf(jkPos)==-1) {
							endEffectMap.push({a:(smartMap[1][i]+j),b:(smartMap[1][i]+k)});
						}
					}
				}
			}
		}
		else {
			var Pos=smartMap[1].indexOf(smartMap[1][i])//what?
			if(Pos>-1) {
				endMap.splice(Pos,1);
				for(var j=-1; j<=1; j++) {
					for(var k=-1; k<=1; k++) {
						jkPos=smartMap[1].indexOf({a:(smartMap[1][i]+j),b:(smartMap[1][i]+k)});
						if(smartMap[1].indexOf(jkPos)>-1) {
							endsmartMap[1].splice(jkPos,1);
						}
					}
				}
			}
		}
	}
}
function startSmartPixel(map,rounds,rate) {
	world=map;
	outEffectMap=[];
	if(world==Infinity) {
		world=[[],[]];
		for(var i=0; i<5; i++) {
			for(var j=0; j<7; j++) {
				world[1].push({a:i, b:j});
				if((i==1 || i==3 || j==1 || j==6) && !((i==1 && j==1) || (i==1 && j==6) || (i==3 && j==3))) {
					world[0].push({a:i, b:j});
				}
			}
		}
	}
	ijk=0;
	return interv=setInterval(function(){ if(ijk<rounds) {smartRound(world); i++;} else {eval("clearInterval(interv)");} }, 1000/rate)
}