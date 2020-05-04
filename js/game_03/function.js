function displayScreen(Num){

}

function addGreenBall() {

}

function subGreenBall() {

}

function displayResult(trueR) {

}

function addSpanBox(num, add, sub){
	var l = 30;
	var p = document.getElementById("123");
	for(var i = 0; i < num; i++){
		var node = document.createElement("span");
		node.className = 'blue-box';
		node.style.left = l + 'px';
		p.appendChild(node);

		l = l + 34;
		if(l == 200) l = l + 5;
		console.log(l);
	}

		for(var i = 0; i < add; i++){
		var node = document.createElement("span");
		node.className = 'pink-box';
		node.style.left = l + 'px';
		p.appendChild(node);
		l = l + 34;
		if(l == 200) l = l + 5;
	}

		for(var i = 0; i < sub; i++){
		var node = document.createElement("span");
		node.className = 'empty-box';
		node.style.left = l + 'px';
		p.appendChild(node);
		l = l + 34;
		if(l == 200) l = l + 5;
	}

	console.log(l);
}

function removeSpanBox() {
	$("span").remove(".blue-box");
	$("span").remove(".pink-box");
	$("span").remove(".empty-box");
}


