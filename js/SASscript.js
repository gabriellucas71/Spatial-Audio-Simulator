//--- Load Audio files and position variables.
var Xdegree = 0;
var Ydegree = 90;
var context = window.AudioContext = window.AudioContext || window.webkitAudioContext;
context = new AudioContext();
var audioList = ['', 'audio/effect1.wav', 'audio/effect2.wav', 'audio/effect3.wav', 'audio/effect4.wav' ];
var audiostatus = 'off';
var listener = {x : '',	y : ''};
var contextListener = context.listener;
var audio = new Array();
var source = new Array(4);
var sound = new Array(4);
var panner = new Array(4);
for (var i=1; i<5; i++){
	var baseString = "#Src";
	audio[baseString + i] = new Audio();
	audio[baseString + i].src = audioList[i];
	audio[baseString + i].loop = true;
	panner[i] = context.createPanner();
	panner[i].connect(context.destination);	
	source[i] = {x : '', y : '', src : '' };
	source[i].src = document.getElementById("Src" + i);
	sound[i] = context.createMediaElementSource(audio[baseString + i]);
	sound[i].connect(panner[i]);
	panner[i].setPosition(source[i].src.offsetLeft, source[i].src.offsetTop, 1);
}

//Listener attributes.
console.log(Xdegree,Ydegree,Math.cos(Xdegree * (Math.PI / 180)),Math.cos(Ydegree * (Math.PI / 180)))
contextListener.setPosition(360,300,0);
contextListener.setOrientation(Math.cos(Xdegree * (Math.PI / 180)),Math.cos(Ydegree * (Math.PI / 180)),-1,0,1,0);

//--- Drag elements with defined classes.
$("#head").draggable({
	containment: "#grid",
	scroll: false,	
	start:function(event, ui) {
		$(this).addClass('noclick');
	},
	drag: positionListener
});

$(".src").draggable({
	containment: "#grid",
	scroll: false,	
	start: function(event, ui) {
		$(this).addClass('noclick');
	},
	drag: positionSources
});

function positionListener(event, ui){
	listener.x = ui.position.left;
	listener.y = ui.position.top;
	console.log(listener.x, listener.y);
	contextListener.setPosition(listener.x, listener.y, 0);
}

function positionSources(event, ui){
	console.log(event.target.id, ui.position.left, ui.position.top)
	var src = event.target.id;
	var srcNumber = src.match(/\d/g);

	srcNumber = parseInt(srcNumber.join(""));
	source[srcNumber].x = ui.position.left;
	source[srcNumber].y = ui.position.top;
	panner[srcNumber].setPosition(source[srcNumber].x, source[srcNumber].y, 1);
}

//--- Turn listener.
$('#head').click(function() {
	if ($(this).hasClass('noclick')){
		$(this).removeClass('noclick');
	}else {
		Xdegree += 90;
		Ydegree += 90;		
		console.log(Xdegree,Ydegree,Math.cos(Xdegree * (Math.PI / 180)),Math.cos(Ydegree * (Math.PI / 180)))
		this.style.transform = "rotate("+-Xdegree+"deg)";
		contextListener.setOrientation(Math.cos(Xdegree * (Math.PI / 180)),Math.cos(Ydegree * (Math.PI / 180)),-1,0,1,0);
	}
});

//--- Demonstration function.
$('#demo').click(function() {
	console.log ('Demo Function')
});

//--- Play/Stop Sound sources on click.
$('.src').click(function(event, ui) {
	if ($(this).hasClass('noclick')) {
		$(this).removeClass('noclick');
	}else {
		var Source = String('#'+ event.target.id);
		var song;

		song = audio[Source];
		console.log();
		playPause(event, song, audiostatus)
	}
});

function playPause(event, song, audiostatus){
	var Source = String('#'+ event.target.id);
	console.log(Source)
	//who is Source
	if (!$(Source).hasClass("srcplay")) {
		console.log(Source)
		if (audiostatus == 'off') {
			console.log(Source)
			$(Source).addClass('srcplay');
			//Play it.
			song.play();
			return false;
		} else if (audiostatus == 'on') {
			$(Source).addclass('srcplay');
			song.play();
		}
	} else {
		//Stop it.
		song.pause();	
		$("Source").removeClass('srcplay');
		audiostatus = 'off';
	}
}