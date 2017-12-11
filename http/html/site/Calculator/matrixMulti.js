function MaTrIx() {
	mAtRiX1=prompt("Please type the first matrix.");
	mAtRiX1=mAtRiX1.split(" ");
	mAtRiX1Rows=mAtRiX1.length;
	for(var i=0; i<mAtRiX1Rows; i++) {
		mAtRiX1[i]=mAtRiX1[i].split(",");
	}
	mAtRiX1Columns=mAtRiX1[0].length
	mAtRiX2=prompt("Please type the second matrix.");
	mAtRiX2=mAtRiX2.split(" ");
	mAtRiX2Rows=mAtRiX2.length;
	for(var i=0; i<mAtRiX1Rows; i++) {
		mAtRiX2[i]=mAtRiX2[i].split(",");
	}
	mAtRiX2Columns=mAtRiX2[0].length;
	var firstArray="[0";
	for(var i=0; i<mAtRiX2Columns-1; i++) {
		firstArray+=",0";
	}
	firstArray+="]";
	var secondArray="["+firstArray;
	for(var rc=0; rc<mAtRiX1Columns-1; rc++) {
		secondArray+=","+firstArray;
	}
	secondArray+="]";
	eval("mAtRiX3="+secondArray);
	digit=1;
	for(var i=0; i<mAtRiX2Columns; i++) {
		for(var ins=0; ins<mAtRiX1Rows; ins++) {
			for(var rc=0; rc<mAtRiX1Columns; rc++) {
				mAtRiX3[ins][i]+=mAtRiX1[ins][rc]*mAtRiX2[rc][i];
				console.log(i+" "+ins+" "+rc+"  "+mAtRiX3[ins][i]);
			}
		}
	}
	/*
	var mAtRiX35="[0"
	for(var i=0; i<mAtRiX1Rows-1; i++) {
	mAtRiX35+=",0"
	alert("Rows: "+mAtRiX1Rows+", 35 creation: "+i)
	}
	mAtRiX35+="]"
	var outputMatrix=mAtRiX35[0];
	for(var ins=1; ins<mAtRiX1Rows; ins++) {
	mAtRiX35[ins]+=""+mAtRiX3[ins][0]+""
	for(var i=1; i<mAtRiX2Columns; i++) {
	mAtRiX35[ins]+=","+mAtRiX3[ins][i]+""
	alert("i: "+i)
	}
	outputMatrix+=" "+mAtRiX35[ins];
	alert("ins: "+ins)
	}

	for(var ins=1; ins<mAtRiX1Rows; ins++) {

	}

	alert(outputMatrix)
	document.getElementById("outputText").innerHTML=outputMatrix;
	*/
	for(var ins=0; ins<mAtRiX1Rows; ins++) {
		eval("document.getElementById(\"outputText"+ins+"\").innerHTML=mAtRiX3[ins]");
	}
}