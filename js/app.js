'use strict';
const plane = document.getElementById('plane');
const pete = document.getElementById('pete');
const logo = document.getElementById('logo');
const menu = document.getElementById('menu');
const social = document.getElementById('social');
const replay = document.getElementById('replay');
const loading = document.getElementById('loading');

const whichAnimationEvent = () => {
	const animations = {
		'animation':'animationend',
		'OAnimation':'oAnimationEnd',
		'MozAnimation':'animationend',
		'WebkitAnimation':'webkitAnimationEnd'
	};

	for(let t in animations){
		if( plane.style[t] !== undefined ){
			return animations[t];
		}
	}
};

replay.addEventListener('click', function(e) {
	e.preventDefault();
	location.reload(false);
});

const animationEvent = whichAnimationEvent();
animationEvent && document.addEventListener(animationEvent, (e) => {
	switch (e.animationName) {
		case 'parachute':
			land();
			break;
		case 'run':
			jump();
			break;
		case 'jump':
			flyRight();
			break;
		case 'fly-right':
			flyLeft();
			break;
		case 'fly-left':
			fadeIn();
			break;
	}

	if(e.target.id === 'menu') {
		flash(0);
	}
});

const init = () => {
	loading.classList.add('load');
	parachute();
};

const parachute = () => {
	pete.classList.add('parachute');
};
const land = () => {
	loading.classList.remove('load');
	pete.classList.remove('parachute');
	pete.classList.add('landed');
	window.setTimeout(() => run(), 200);
};
const run = () => {
	pete.classList.remove('landed');
	pete.classList.add('run');
};

const jump = () => {
	pete.classList.remove('run');
	pete.classList.add('jump');
};

const flyRight = () => {
	pete.classList.remove('jump');
	pete.classList.add('hidden');
	plane.classList.add('fly-right');
};

const flyLeft = () => {
	plane.classList.remove('fly-right');
	plane.classList.add('fly-left');
};

const fadeIn = () => {
	logo.classList.add('fade-in');
	window.setTimeout(() => menu.classList.add('fade-in'), 1000);
	window.setTimeout(() => social.classList.add('fade-in'), 2000);
	window.setTimeout(() => replay.classList.add('fade-in'), 10000);
};

const flash = (count) => {
	if(count > 5) { return; }
	let i = count %2 === 0 ? 0 : 1;
	menu.children[i].classList.toggle('hover');
	count++;
	window.setTimeout(() => {
		menu.children[i].classList.toggle('hover');
		flash(count);
	}, 500);
};

window.setTimeout(() => init(), 1000);