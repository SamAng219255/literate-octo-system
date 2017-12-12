class thuemorse {
	constructor() {
		this.values=[false]
		this.place=0
		this.iteration=0
		this.newValue=function () {
			if(this.place<Math.pow(2,this.iteration)) {
				this.place++
				this.values.push(!this.values[this.place])
				return !this.values[this.place]
			}
			else {
				this.iteration++
				this.place=0
				this.values.push(!this.values[this.place])
				return !this.values[this.place]
			}
		}
	}
}


seq=new thuemorse()
function colortree() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			days=this.responseText.split("\n\n");
		}
	};
	xhttp.open("GET", "treehtml.txt", true);
	xhttp.send();
}
function coloring() {
	var day=(new Date()).getDate();
	var temp=days[Math.min(Math.floor(day/(19/days.length)),days.length-1)];
	var temp2=temp.split("^");
	var total="";
	for(var i=0; i<temp2.length; i++) {
		var light="^";
		if(seq.newValue()) {
			light="*";
		}
		if(i>0) {
			total+=light;
		}
		total+=temp2[i];
	}
	document.getElementById("tree").innerHTML=total;
}
