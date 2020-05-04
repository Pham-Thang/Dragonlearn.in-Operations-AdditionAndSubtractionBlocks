var screenNum = 0; // man choi hien tai
var screenCur = 0; // man choi khi tru diem

displayScreen(screenNum);

function chooseResult(choose) {
	
	if(choose == screen[screenNum].choose) {
		// true
		addGreenBall(screenCur);
		screenCur++;
		screenNum = screenCur;
		displayResult(true);
		setTimeout(displayScreen(screenNum), 0);
	}
	else{

		if(screenCur > 1){
			
			screenCur--;
			subGreenBall(screenCur);
			screenCur--;
		}
		displayResult(false);
	}
	console.log(screenCur);
}

