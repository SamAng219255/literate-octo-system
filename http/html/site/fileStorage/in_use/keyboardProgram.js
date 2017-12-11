var q="q";
var w="w";
var e="e";
var r="r";
var t="t";
var y="y";
var u="u";
var i="i";
var o="o";
var p="p";
var a="a";
var s="s";
var d="d";
var f="f";
var g="g";
var h="h";
var j="j";
var k="k";
var l="l";
var z="z";
var x="x";
var c="c";
var v="v";
var b="b";
var n="n";
var m="m";
var digt1=" ";
var digt2=" ";
var digt3=" ";
var digt4=" ";
var digt5=" ";
var digt6=" ";
var digt7=" ";
var digt8=" ";
var digt9=" ";
var digt10=" ";
var digit=1;
function letter(inputLetter)
{
	Letter=inputLetter
	eval("digt"+digit+"="+Letter+";")
	digit+=1
	document.getElementById("outputText").innerHTML=digt1+digt2+digt3+digt4+digt5+digt6+digt7+digt8+digt9+digt10;
}
function clearq()
{
	digt1=" ";
	digt2=" ";
	digt3=" ";
	digt4=" ";
	digt5=" ";
	digt6=" ";
	digt7=" ";
	digt8=" ";
	digt9=" ";
	digt10=" ";
	digit=1;
	document.getElementById("outputText").innerHTML=digt1+digt2+digt3+digt4+digt5+digt6+digt7+digt8+digt9+digt10;
}
function backspace()
{
	digit-=1
	eval("digt"+digit+"=\" \";");
	document.getElementById("outputText").innerHTML=digt1+digt2+digt3+digt4+digt5+digt6+digt7+digt8+digt9+digt10;
}
function next()
{
	digit+=1
}
function previous()
{
	digit-=1
}
