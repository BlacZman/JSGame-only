function Startgame() {
	gameArea.start();
	Player = new Character("material/Character/element1.png", 5, "Robert", 10, 600);
}

var gameArea = {
	Box : document.createElement("canvas"),
	start : function() {
		var area = this.Box;
		area.width = 1028;
		area.height = 720;
		area.style.border = "1px solid black";
		this.ctx = area.getContext("2d");
		document.body.insertBefore(area, document.body.childNodes[0]);
		this.interval = setInterval(updateFrame, 1000/60);
		window.addEventListener("keydown", function(e) {
			gameArea.keys = (gameArea.keys || []);
			gameArea.keys[e.keyCode] = (e.type == "keydown");
		})
		window.addEventListener("keyup", function(e) {
			gameArea.keys = (gameArea.keys || []);
			gameArea.keys[e.keyCode] = (e.type == "keydown");
		})
	},
	clear : function() {
		this.ctx.clearRect(0, 0, this.Box.width, this.Box.height);
	}
}
class Character {
	constructor(imgsrc, /*type, */speed, name, x, y) {
		this.image = new Image();
		this.image.src = imgsrc;
		//this.type = type; //enemy, friend or neutral
		this.jumpspeed = 15;
		this.curspeedX = 0;
		this.speedX = speed;
		this.speedY = 0;
		this.curspeedY = 0;
		this.name = name;
		this.posX = x;
		this.posY = y;
		this.gravity = 0.9;
		this.hitGround = false;
	}
	update() {
		var box = gameArea.ctx;
		box.drawImage(this.image, this.posX, this.posY/*, this.image.width, this.image.height*/);
	}
	newPos() {
		this.posX += this.curspeedX;
		this.curspeedY += this.speedY + this.gravity;
		this.posY += this.curspeedY;
		this.hitObject();
	}
	jump() {
		this.speedY += jumpspeed;
	}
	hitObject(obj) {
		if (obj == null) {
			var bottom = gameArea.Box.height-this.image.height;
			var left = 0;
			var right = gameArea.Box.width-this.image.width;
			var top = 0;
			var fixY = Math.floor(this.posY);
			if (fixY > bottom){
				this.posY = bottom;
				this.hitGround = true;
			}
			else if(fixY < bottom) {
				this.hitGround = false;
			}
			if (fixY < top) {
				this.posY = top;
			}
			if (this.posX < left) {
				this.posX = left;
			}
			if (this.posX > right) {
				this.posX = right;
			}
		}
	}
}
var updateFrame = function() {
	gameArea.clear();
	Player.curspeedX = 0;
	Player.speedY = 0;
	if (gameArea.keys && gameArea.keys[37]) {
		Player.curspeedX = -Player.speedX;
		Player.image.src = "material/Character/element1_2.png";
	}
	if (gameArea.keys && gameArea.keys[39]) {
		Player.curspeedX = Player.speedX;
		Player.image.src = "material/Character/element1.png";
	}
	if (gameArea.keys && gameArea.keys[38] && (Player.hitGround == true)) {
		Player.speedY = -15;
	}
	Player.newPos();
	Player.update();
}