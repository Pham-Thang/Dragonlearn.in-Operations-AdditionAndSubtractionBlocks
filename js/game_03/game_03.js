var screenNum = 0; // man choi hien tai
var screenCur = 0; // man choi khi tru diem

displayScreen(screenNum);

function chooseResult(choose) {
	
	if(choose == screen[screenNum].choose) {
		displayResult(choose, true);
		addGreenBall(screenCur);
		screenCur++;
		screenNum = screenCur;
		
		setTimeout(displayScreen(screenNum), 2000);
		
		
	}
	else{
		
		displayResult(choose, false);
		if(screenCur > 1){
			
			screenCur--;
			subGreenBall(screenCur);
			screenCur--;
		}
		
	}
	
}

