var screenNum = 0;

displayScreen(screenNum);

function chooseResult(choose) {
	
	if(choose == screen[screenNum].choose) {
		// true
		addGreenBall();
		screenNum++;
		displayResult(true);
		setTimeout(displayScreen(screenNum), 3000);
	}
	else{
		subGreenBall();
		if(screenNum > 0){
			screenNum--;
		}
		displayResult(false);
	}
}

