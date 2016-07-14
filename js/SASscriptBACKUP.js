//--- Load Audio files and position variables.
var dragStatus;
var degrees = 0;
var demo = document.getElementById('demo');
var context = window.AudioContext = window.AudioContext || window.webkitAudioContext;
var audioList = ['', 'audio/effect1.wav', 'audio/effect2.wav', 'audio/effect3.wav', 'audio/effect4.wav' ];
var audiostatus = 'off';
var listener = {x : '',	y : '', id : ''};
listener.id = document.getElementById('head');
context = new AudioContext();
var contextListener = context.listener;
var audio = new Array(4);
var source = new Array(4);
var sound = new Array(4);
var panner = new Array(4);
for (var i=1; i<5; i++){
	audio[i] = new Audio();
	audio[i].src = audioList[i];
	audio[i].loop = true;
	panner[i] = context.createPanner();
	panner[i].connect(context.destination);
	source[i] = {x : '', y : '', src : '', distX : '', distY : '' };
	source[i].src = document.getElementById("Src" + i);
	sound[i] = context.createMediaElementSource(audio[i]);
	sound[i].connect(panner[i]);
}

//Listener attributes.

contextListener.setPosition(460,300,0);
//contextListener.setOrientation(0,0,-1,0,1,0);

//--- Drag elements with defined classes.
function startDrag(e) {

	dragStatus = 1;
	
	//Determine event object.
	if (!e) {
		var e = window.event;
	}
	if(e.preventDefault) e.preventDefault();

	// IE uses srcElement, others use target.
	targ = e.target ? e.target : e.srcElement;
	if (targ.className != 'draggable' ) {
		if (targ.className != 'src draggable' ) {return};
	};

	//Calculate event X, Y coordinates.
	offsetX = e.clientX;
	offsetY = e.clientY;

	//Assign default values for top and left properties.
	if(!targ.style.left) { targ.style.left='0px'};
	if (!targ.style.top) { targ.style.top='0px'};

	//Calculate integer values for top and left properties.
	coordX = parseInt(targ.style.left);
	coordY = parseInt(targ.style.top);
	drag = true;

	//Move element.
	document.onmousemove = dragDiv;
	return false;
}

function dragDiv(e) {
	if (!drag) {return};
	if (!e) { var e= window.event};
	

	positionSources()
	positionListener()

	//Move element
	targ.style.left=coordX+e.clientX-offsetX+'px';
	targ.style.top=coordY+e.clientY-offsetY+'px';

	return false;
}

function stopDrag() {
	drag=false;
	dragStatus = 0;
}
window.onload = function() {
	document.onmousedown = startDrag;
	document.onmouseup = stopDrag;
}

function orientationListener(){ //The orientation will change as the Listener turns.
	//contextListener.setOrientation(0,0,-1,0,1,0);
}

function positionListener(){
	obj = listener.id;
	listener.x = obj.offsetLeft;
	listener.y = obj.offsetTop;
	contextListener.setPosition(listener.x,listener.y,0);
}

function positionSources(){
	for (var i=1; i<5; i++){
		obj = source[i].src;
		source[i].x = obj.offsetLeft;
		source[i].y = obj.offsetTop;
		panner[i].setPosition(source[i].x, source[i].y, 1);
	}
}

//$( "head" ).draggable({ containment: "#grid-snap", scroll: false })

/*function headingTo() {

	for (var i=1; i<5; i++){
		source[i].distX = Math.abs(listener.x - source[i].x);
		source[i].distY = Math.abs(listener.y - source[i].y);
	}

	if (source[1].distX < source[2].distX){	
		console.log('Listener heading to SRC1')		
		factorX[1] += -0.012;
		//if (source[1].distX < 70){
		//	factorX[1] = 465;
		//}

	} else	{ //Make it clearer to hear SRC2.
		console.log('Listener heading to SRC2')
		factorX[1] += +0.012;
		factorX[2] = 450
		factorX[2] += +0.012;
		if (source[1].distX < 70){
			factorX[1] = 459;
			factorX[2] = 455;
		}


	}
	console.log(factorX[1], factorX[2])
	panner[1].setPosition(factorX[1], 300, 0);
	panner[2].setPosition(factorX[2], 300, 0);

	if (source[1].distX < source[2].distX){ //Make it clearer to hear western objects.
		c[2] = c[2] - 0.006; 
		f[4] = f[4] + 0.006; 
		console.log(c[2], f[4]);	
		console.log('Listener heading west.') 
		panner[2].setPosition(c[2], 1, 0);
		panner[4].setPosition(f[4], 1, 0);
		if (source[1].distY < source[3].distY){ //Make it clearer to hear SRC1.
			c[1] = c[1] - 0.006; 
			f[3] = c[1] + 0.006; 
			//console.log(c[1], f[3]);
			console.log('Listener heading to SRC1')
			panner[1].setPosition(c[1], 0, 0);
			panner[3].setPosition(f[3], 0.5, 0);
		} else	{ //Make it clearer to hear SRC3.
			c[3] = c[3] - 0.006; 
			f[1] = c[3] + 0.006; 
			console.log(c[3], f[1]);
			console.log('Listener heading to SRC3')
			panner[1].setPosition(f[1], 0.5, 0);
			panner[3].setPosition(c[3], 0, 0);
		}	
	} else  { //Make it clearer to hear eastern objects.
		c[1] = c[1] - 0.006; 
		f[3] = f[3] + 0.006; 
		console.log(c[1], f[3]);
		console.log('Listener heading east.')
		panner[1].setPosition(-0.2, 0, 0);
		panner[3].setPosition(-0.1, 0, 0);
		if (source[2].distY < source[4].distY){ //Make it clearer to hear SRC2.
			c[2] = c[2] - 0.006; 
			f[4] = f[4] + 0.006; 
			console.log(c[2], f[4]);
			console.log('Listener heading to SRC2')
			panner[2].setPosition(0.1, 0, 0);
			panner[4].setPosition(1, 0, 0);	
		} else	{ //Make it clearer to hear SRC4.
			c[2] = c[2] - 0.006; 
			f[4] = f[4] + 0.006;  
			console.log(c[2], f[4]);
			console.log('Listener heading to SRC4')
			panner[2].setPosition(0.1, 0, 0);
			panner[4].setPosition(1, 0, 0);	
		}
	}

	if (source[2].distX < 70 || source[4].distX < 70 || source[2].distY < 70 || source[4].distY < 70){
		c[2] = f[2] = c[4] = f[4] = 1;
	}

	if (source[1].distX < 70 || source[3].distX < 70 || source[1].distY < 70 || source[3].distY < 70){			
		c[1] = f[1] = c[3] = f[3] = -1;		
	}
}*/


demo.onclick = function(){
	console.log (' Demo Function')
}

listener.id.onclick = function(){
	if (dragStatus == 0){
		degrees += 90;
		this.style.transform = "rotate("+degrees+"deg)";
		contextListener.setOrientation(0,0,-1,0,1,0);
	}
}

source[1].src.onclick = function(){
	if (dragStatus == 1){
		return false;
	}
	if (!source[1].src.classList.contains("srcplay")) {
		if (audiostatus == 'off') {
			source[1].src.classList.add('srcplay');
			//Play it.
			audio[1].play();
			return false;
		} else if (audiostatus == 'on') {
			source[1].src.classList.add('srcplay');
			audio[1].play();
		}
	} else if (source[1].src.classList.contains("srcplay")) {
		//Stop it.
		audio[1].pause();	
		source[1].src.classList.remove('srcplay');
		audiostatus = 'off';
	}
}

source[2].src.onclick = function(){
	if (dragStatus == 1){
		return false;
	}
	if (!source[2].src.classList.contains("srcplay")) {
		if (audiostatus == 'off') {
			source[2].src.classList.add('srcplay');
			//Play it.
			audio[2].play();
			return false;
		} else if (audiostatus == 'on') {
			source[2].src.classList.add('srcplay');
			audio[2].play();
		}
	} else if (source[2].src.classList.contains("srcplay")) {
		//Stop it.
		audio[2].pause();	
		source[2].src.classList.remove('srcplay');
		audiostatus = 'off';
	}
}

source[3].src.onclick = function(){
	if (dragStatus == 1){
		return false;
	}
	if (!source[3].src.classList.contains("srcplay")) {
		if (audiostatus == 'off') {
			source[3].src.classList.add('srcplay');
			//Play it.
			audio[3].play();
			return false;
		} else if (audiostatus == 'on') {
			source[3].src.classList.add('srcplay');
			audio[3].play();
		}
	} else if (source[3].src.classList.contains("srcplay")) {
		//Stop it.
		audio[3].pause();	
		source[3].src.classList.remove('srcplay');
		audiostatus = 'off';
	}
}

source[4].src.onclick = function(){
	if (dragStatus == 1){
		return false;
	}
	if (!source[4].src.classList.contains("srcplay")) {
		if (audiostatus == 'off') {
			source[4].src.classList.add('srcplay');
			//Play it.
			audio[4].play();
			return false;
		} else if (audiostatus == 'on') {
			source[4].src.classList.add('srcplay');
			audio[4].play();
		}
	} else if (source[4].src.classList.contains("srcplay")) {
		//Stop it.
		audio[4].pause();	
		source[4].src.classList.remove('srcplay');
		audiostatus = 'off';
	}
}

//--- Turn listener.