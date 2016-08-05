//--- Load Audio files and position variables.
var l = 418;
var t = 318;
var Xdegree = 0;
var Ydegree = -90;
var context = window.AudioContext = window.AudioContext
|| window.webkitAudioContext;
context = new AudioContext();
var audioList = [ '', 'audio/effect2.wav', 'audio/effect1.wav',
                  'audio/effect3.wav', 'audio/effect4.wav' ];
var contextListener = context.listener;
var audio = new Array();
var source = new Array(4);
var sound = new Array(4);
var panner = new Array(4);
var oscillator = new Array(4);
for (var i = 1; i < 5; i++) {
	var baseString = "#Src";
	audio[baseString + i] = new Audio();
	audio[baseString + i].src = audioList[i];
	audio[baseString + i].loop = true;
	panner[i] = context.createPanner();
	panner[i].connect(context.destination);
	source[i] = {
			x : '',
			y : '',
			src : ''
	};
	source[i].src = document.getElementById("Src" + i);
	oscillator[baseString + i] = context.createOscillator();
	oscillator[baseString + i].start();
	oscillator[baseString + i].type = 'square';
	panner[i].setPosition(source[i].src.offsetLeft, source[i].src.offsetTop, 0);
}
oscillator[baseString + 1].frequency.value = 50;
oscillator[baseString + 2].frequency.value = 500;
oscillator[baseString + 3].frequency.value = 300;
oscillator[baseString + 4].frequency.value = 80;

//Sources attributes.
panner[1].setOrientation(1, 0, 0);
panner[2].setOrientation(-1, 0, 0);
panner[3].setOrientation(1, 0, 0);
panner[4].setOrientation(-1, 0, 0);

//Listener attributes.
contextListener.setPosition(360, 260, 0);
//contextListener.setOrientation(-1,1,0,0,1,0);
contextListener.setOrientation(0, Math.sin(Xdegree * (Math.PI / 180)), Math.sin(Ydegree * (Math.PI / 180)),0,1,0);
console.log (Xdegree, Ydegree, Math.sin(Xdegree * (Math.PI / 180)), Math.sin(Ydegree * (Math.PI / 180)))

//--- Drag elements with defined classes.
$("#head").draggable({
	containment : "#grid",
	scroll : false,
	start : function(event, ui) {
		$(this).addClass('noclick');
	},
	drag : positionListener
});

$(".src").draggable({
	containment : "#grid",
	scroll : false,
	start : function(event, ui) {
		$(this).addClass('noclick');
	},
	drag : positionSources
});

//--- Play/Stop Sound sources on click.
$('.src').click(function(event, ui) {
	if ($(this).hasClass('noclick')) {
		$(this).removeClass('noclick');
	} else {
		playPause(event)
	}
});

//--- Turn listener on click.
$('#head').click(function() {
	if ($(this).hasClass('noclick')) {
		$(this).removeClass('noclick');
	} else {
		turn();
	}
});

//--- Demonstration function.
$('#demo').click(function() {
	turnOnAll();
	positionListenerDemo(l, t);
	firstMove();	
	U = setTimeout(function(){ secondMove() }, 7500);
	V = setTimeout(function(){ thirdMove() }, 13000);
	W = setTimeout(function(){ fourthMove() },20500);
	X = setTimeout(function(){ fifthMove() }, 29000);
	Y = setTimeout(function(){ sixthMove() }, 36000);
	Z = setTimeout(function(){ seventhMove() }, 41500);
	A = setTimeout(function(){ eighthMove() }, 48000);
	B = setTimeout(function(){ ninthMove() }, 58500);
	C = setTimeout(function(){ turnOffAll() }, 65000);
});

//--- Get the position of the Listener while dragging and sets the Listener position.
function positionListener(event, ui) {
	var listenerx = ui.position.left;
	var listenery = ui.position.top;
	console.log(listenerx, listenery);
	contextListener.setPosition(listenerx, listenery, 0);
}

//--- Get the position of Sources while dragging and sets the panner position.
function positionSources(event, ui) {
	console.log(event.target.id, ui.position.left, ui.position.top)
	var src = event.target.id;
	var srcNumber = src.match(/\d/g);
	srcNumber = parseInt(srcNumber.join(""));
	console.log(srcNumber)
	source[srcNumber].x = ui.position.left;
	source[srcNumber].y = ui.position.top;
	panner[srcNumber].setPosition(source[srcNumber].x, source[srcNumber].y, 0);
}

//--- Turn listener and set Listener orientation.
function turn() {
	Xdegree += 90;
	Ydegree += 90;
	console.log(Xdegree, Ydegree)
	$("#head").css({
		'-webkit-transform' : "rotate(" + -Xdegree + "deg)",
		'-moz-transform' : "rotate(" + -Xdegree + "deg)",
		'-ms-transform' : "rotate(" + -Xdegree + "deg)",
		'-o-transform' : "rotate(" + -Xdegree + "deg)",
		'transform' : "rotate(" + -Xdegree + "deg)"
	});
	contextListener.setOrientation(0, Math.sin(Xdegree * (Math.PI / 180)), Math.sin(Ydegree * (Math.PI / 180)),0,1,0);
	console.log(Math.sin(Xdegree * (Math.PI / 180)), Math.sin(Ydegree * (Math.PI / 180)))
}

//--- Turn on all sound sources.
function turnOnAll() {
	for (var i = 1; i < 5; i++) {
		var song = oscillator[baseString + i];
		song.connect(panner[i]);
		$('#Src' + i).addClass('srcplay');
	}
}

//--- Turn off all sound sources.
function turnOffAll() {
	for (var i = 1; i < 5; i++) {
		var song = oscillator[baseString + i];
		song.disconnect(panner[i]);
		$('#Src' + i).removeClass('srcplay');
	}
}

//--- Turn on/off the selected sound sources.
function playPause(event) {
	var Source = String('#' + event.target.id);
	console.log(Source)
	var src = event.target.id;
	var srcNumber = src.match(/\d/g);
	srcNumber = parseInt(srcNumber.join(""));
	var song = oscillator[Source];
	if (!$(Source).hasClass("srcplay")) {
		$(Source).addClass('srcplay');
		song.connect(panner[srcNumber]);
	} else {
		song.disconnect(panner[srcNumber]);
		$(Source).removeClass('srcplay');
	}
}

function firstMove() {
	console.log(l, t)
	l += -50;
	t += +20;
	$("#head").offset({
		top : t,
		left : l
	});
	positionListenerDemo(l, t);
	if (l < 69){
		console.log(l, t)
		clearTimeout(T);
		console.log(T)
	} else {
		T = setTimeout(function(){ firstMove() }, 1000);
	}
}

function secondMove() {
	console.log(t)
	t += -50;
	$("#head").offset({
		top : t,
		left : l
	});
	positionListenerDemo(l, t);
	if (t < 217){
		console.log(l, t)
		clearTimeout(U);
		console.log(U)
	} else {
		U = setTimeout(function(){ secondMove() }, 1000);
	}
}

function thirdMove() {
	console.log(l, t)
	l += +22.85;
	t += -20;
	$("#head").offset({
		top : t,
		left : l
	});
	positionListenerDemo(l, t);
	if (t < 79){
		console.log(l, t)
		clearTimeout(V);
		console.log(V)
		turn();
	} else {
		V = setTimeout(function(){ thirdMove() }, 1000);
	}
}

function fourthMove() {
	console.log(l)	
	l += +50;
	$("#head").offset({
		top : t,
		left : l
	});
	positionListenerDemo(l, t);
	if (l > 617){
		console.log(l, t)
		clearTimeout(W);
		console.log(W)
	} else {
		W = setTimeout(function(){ fourthMove() }, 1000);
	}
}

function fifthMove() {
	console.log(l, t)
	l += +19.28;
	t += +21.42;
	$("#head").offset({
		top : t,
		left : l
	});
	positionListenerDemo(l, t);
	if ( t > 217){
		turn();
		console.log(l, t)
		clearTimeout(X);
		console.log(X)
	} else {
		X = setTimeout(function(){ fifthMove() }, 1000);
	}
}

function sixthMove() {
	console.log(t)
	t += +50;
	$("#head").offset({
		top : t,
		left : l
	});
	positionListenerDemo(l, t);
	if (t > 457){
		console.log(l, t)
		clearTimeout(Y);
		console.log(Y)
	} else {
		Y = setTimeout(function(){ sixthMove() }, 1000);
	}
}

function seventhMove() {
	console.log(l, t)
	l += -25.71;
	t += +18.28;
	$("#head").offset({
		top : t,
		left : l
	});
	positionListenerDemo(l, t);
	if (t > 565){
		turn();
		console.log(l, t)
		clearTimeout(Z);
		console.log(Z)
	} else {
		Z = setTimeout(function(){ seventhMove() }, 1000);
	}
}

function eighthMove() {
	console.log(l)	
	l += -50;
	$("#head").offset({
		top : t,
		left : l
	});
	positionListenerDemo(l, t);
	if (l < 230){
		console.log(l, t)
		clearTimeout(A);
		console.log(A)
	} else {
		A = setTimeout(function(){ eighthMove() }, 1000);
	}
}

function ninthMove() {
	console.log(l, t)
	l += +30;
	t += -36.37;
	$("#head").offset({
		top : t,
		left : l
	});
	positionListenerDemo(l, t);
	if (t < 324){
		turn();
		console.log(l, t)
		clearTimeout(B);
		console.log(B)
	} else {
		B = setTimeout(function(){ ninthMove() }, 1000);
	}
}

//--- Sets the Listener position in the demo function.
function positionListenerDemo() {
	var listenerx = l;
	var listenery = t;
	//console.log(listenerx, listenery);
	contextListener.setPosition(listenerx, listenery, 0);
}