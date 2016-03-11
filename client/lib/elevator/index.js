var Elevator = require('./elevator.min');

var elevator = new Elevator({
	element: document.querySelector('.elevator'),
	mainAudio: '../shared-assets/FullMoonSamba2.mp3',
	endAudio: '../shared-assets/ding.mp3'
});