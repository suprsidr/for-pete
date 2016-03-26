'use strict';
const plane = document.getElementById('plane');

function whichAnimationEvent(){
	const animations = {
		'animation':'animationend',
		'OAnimation':'oAnimationEnd',
		'MozAnimation':'animationend',
		'WebkitAnimation':'webkitAnimationEnd'
	}

	for(let t in animations){
		if( plane.style[t] !== undefined ){
			return animations[t];
		}
	}
}

const animationEvent = whichAnimationEvent();
animationEvent && document.addEventListener(animationEvent, function(e) {
	switch (e.animationName) {
		case 'fly-right':
			flyLeft();
			break;
		case 'fly-left':
			fadeIn();
			break;
	}
});

function init() {

}

function parachute() {

}

function run() {

}

function jump() {

}

function flyRight() {
	plane.classList.add('fly-right');
}

function flyLeft() {
	plane.classList.remove('fly-right');
	plane.classList.add('fly-left');
	console.log('flying left');
}

function fadeIn(el) {

}

window.setTimeout(() => flyRight(), 2000);