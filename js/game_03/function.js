var divPlate = document.getElementsByClassName("plate");
var divBall= document.getElementsByClassName("ball");

function addSpanBox(index, num, add, sub){
	var l = 30;
	var p = divPlate;
	for(var i = 0; i < num; i++){
		var node = document.createElement("span");
		node.className = 'blue-box';
		node.style.left = l + 'px';
		p[index].appendChild(node);

		l = l + 34;
		if(l == 200) l = l + 5;
	}

		for(var i = 0; i < add; i++){
		var node = document.createElement("span");
		node.className = 'pink-box';
		node.style.left = l + 'px';
		p[index].appendChild(node);
		l = l + 34;
		if(l == 200) l = l + 5;
	}

		for(var i = 0; i < sub; i++){
		var node = document.createElement("span");
		node.className = 'empty-box';
		node.style.left = l + 'px';
		p[index].appendChild(node);
		l = l + 34;
		if(l == 200) l = l + 5;
	}

}

function removeSpanBox() {
	$("span").remove(".blue-box");
	$("span").remove(".pink-box");
	$("span").remove(".empty-box");
}

function displayScreen(num){
	removeSpanBox();
	document.getElementById('idexp').innerHTML = screen[num].trueExp;

	for(var i = 0; i <= 3; i++){
		addSpanBox(i, screen[num].exp[i].num,screen[num].exp[i].add, screen[num].exp[i].sub);
	}
}


function addGreenBall(num) {
	var index = 9 - num;
	divBall[index].style.float = 'right';
}

function subGreenBall(num) {
	var index = 9 - num;
	divBall[index].style.float = 'left';
}

function displayResult(trueR) {

}

