var spooky="             __             \n             \\ \\            \n     ________/ /________    \n    /                   \\   \n   /    ___       ___    \\  \n  /     \\  \\     /  /     \\ \n |       \\__\\   /__/       |\n |                         |\n |      ____  _  ____      |\n |      \\   \\/ \\/   /      |\n  \\      \\/\\_____/\\/      / \n   \\                     /  \n    \\___________________/   \n                            ";
var pumpkin="             __             \n             \\ \\            \n     ________/ /________    \n    /  /  /  / \\  \\  \\  \\   \n   /  /  /  |   |  \\  \\  \\  \n  /  /  |   |   |   |  \\  \\ \n |  |   |   |   |   |   |  |\n |  |   |   |   |   |   |  |\n |  |   |   |   |   |   |  |\n |  |   |   |   |   |   |  |\n  \\  \\  |   |   |   |  /  / \n   \\  \\  \\  |   |  /  /  /  \n    \\__\\__\\__\\_/__/__/__/   \n                            ";
function spook() {
	document.getElementById("pumpkin").innerText=spooky;
}
function resetPump() {
	document.getElementById("pumpkin").innerText=pumpkin;
}
function scare(phase) {
	if(typeof phase == "undefined" || phase==0) {
		setTimeout(scare,Math.random()*10000+2500,1);
    }
	else if(phase==1) {
		spook();
		setTimeout(scare,Math.random()*50+63,2);
    }
	else if(phase==2) {
		resetPump();
		setTimeout(scare,Math.random()*50+63,3);
    }
	else if(phase==3) {
		spook();
		setTimeout(scare,Math.random()*50+63,4);
    }
	else if(phase==4) {
		resetPump();
		if(continueScare==true) {
			setTimeout(scare,Math.random()*50+63,0);
        }
    }
}
continueScare=(new Date()).getMonth()==9;
if(continueScare) {
	scare();
}
