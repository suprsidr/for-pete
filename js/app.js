var c = document.getElementById('theCanvas');
c.setAttribute('width', window.innerWidth);
c.setAttribute('height', window.innerHeight);
var stage, w, h, loader, img = {}, maxPiled = 140;
var arr = ['DYN9001', 'DYN9103', 'DYNP4007', 'DYNP4008T', 'EFLB0701S_a0', 'EFLB0998_a0', 'EFLB1202S20_a0', 'extra-battery',
	'fug-aaa', 'fug-d', 'KXSB0013_a0', 'KXSB2060EC_a0', 'LOSB0846_a0', 'LOSB0878_a0', 'TRA2823X_a0', 'TRA2840_a0', 'TRA2854X_a0'];

function init() {
	stage = new createjs.Stage('theCanvas');

	// grab canvas width and height for later calculations:
	w = stage.canvas.width;
	h = stage.canvas.height;
var manifest = [];
arr.forEach(function(item) {
	manifest.push({src: item + '.png', id: item})
})
loader = new createjs.LoadQueue(false);
loader.addEventListener("complete", handleComplete);
loader.loadManifest(manifest, true, "img/png/");
}

function handleComplete() {
	console.log('all loaded!', w, h);
	var container = new createjs.Container();
	container.set({x: 0, y: 0, height: h, width: w});
	stage.addChildAt(container, 0);
	var text = new createjs.Text("It's Raining Batteries", "60px sans-serif", "#004e96");
	text.set({x: 50, y: 50});
	text.shadow = new createjs.Shadow("rgba(0,78,150,.5)", 2, 2, 4);
	stage.addChildAt(text, 1);
	arr.forEach(function(i) {
		img[i] = new createjs.Bitmap(loader.getResult(i));
		var scale = Math.random();
		var rotation = getRandomNumBetween(0,90);
		img[i].setTransform(Math.random() * w, Math.random() * h, scale, scale, rotation);
		img[i].alpha = 1;
		img[i].gravity = getRandomNumBetween(3,10);
		img[i].updatePosition = function() {
			this.y+=this.gravity;
			if(this.y >= h - (this.image.height/2) ) {
				// limit piled to 100
				if(container.children.length < maxPiled) {
					var clone = this.clone()
					delete clone.updatePosition;
					delete clone.gravity;
					container.addChildAt(clone, arr.length);
				} else {
					container.removeChildAt(getRandomNumBetween(arr.length + 1, container.children.length - 60));
				}
				// put our battery back up top and re-scale/rotate/gravity and start it all over.
				var scale = Math.random();
				var rotation = getRandomNumBetween(0,90);
				this.gravity = getRandomNumBetween(3,10);
				this.setTransform(Math.random() * w, this.image.height * -1, scale, scale, rotation);
			}
		}
		container.addChild(img[i]);
	})

	createjs.Ticker.timingMode = createjs.Ticker.RAF;
	createjs.Ticker.addEventListener("tick", tick);
}

function getRandomNumBetween(min,max) {
	return Math.floor(Math.random()*(max-min+1)+min);
}

function tick(event) {
	arr.forEach(function(i) {
		img[i].updatePosition();
	});
	stage.update(event);
}

//init();
