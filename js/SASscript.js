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
contextListener.setOrientation(degrees,degrees+90,-1,0,1,0);

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
	console.log(listener.x, listener.y)
}

function positionSources(){
	for (var i=1; i<5; i++){
		obj = source[i].src;
		source[i].x = obj.offsetLeft;
		source[i].y = obj.offsetTop;
		panner[i].setPosition(source[i].x, source[i].y, 1);
	}
}

//$( "head" ).draggable({ containment: "#grid-snap", scroll: false }) // Easier with Jquery.

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
listener.id.onclick = function(){
	if (dragStatus == 0){
		degrees += 90;
		this.style.transform = "rotate("+degrees+"deg)";
		console.log(degrees);
		contextListener.setOrientation(sen,-1,0,1,0);
	}
}

//--- Demonstration function.
demo.onclick = function(){
	console.log (' Demo Function')
	while (listener.id.offsetLeft < 122 && listener.id.offsetop > 314){ //First Move.
		listener.id.offsetLeft -= 1;
		listener.id.offsetTop += 1;
	}

	while (listener.id.offsetLeft < XXX && listener.id.offsetop > YYY){ //Second Move.
		listener.id.offsetLeft -= 1;
		listener.id.offsetTop += 1;
	}

	degrees += 90;
	listener.id.style.transform = "rotate("+degrees+"deg)";

	while (listener.id.offsetLeft < XXX && listener.id.offsetop > YYY){ //Third Move.
		listener.id.offsetLeft -= 1;
		listener.id.offsetTop += 1;
	}

	degrees += 90;
	listener.id.style.transform = "rotate("+degrees+"deg)";

	while (listener.id.offsetLeft < XXX && listener.id.offsetop > YYY){ //Forth Move.
		listener.id.offsetLeft -= 1;
		listener.id.offsetTop += 1;
	}

	degrees += 90;
	listener.id.style.transform = "rotate("+degrees+"deg)";

	while (listener.id.offsetLeft < XXX && listener.id.offsetop > YYY){ //Last Move, back to center.
		listener.id.offsetLeft -= 1;
		listener.id.offsetTop += 1;
	}

	degrees += 90;
	listener.id.style.transform = "rotate("+degrees+"deg)";
}