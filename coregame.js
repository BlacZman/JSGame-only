function Startgame() {
	gameArea.start();
	Player = new Character("material/Character/SS_Player.png", "player", 5, "Robert", 10, 650, 0, 7, 10);
	Enemy1 = new EnemyCharacter("material/Character/SS_Enemy_zombie.png", "enemy", 2.5, "Zombie", 1250, 650, 250, 7, 10);
	Map1 = new Map("material/Map/tile1.png", 400, 800);
}

var gameArea = {
	Box : document.createElement("canvas"),
	start : function() {
		var area = this.Box;
		this.frameNum = 0;
		area.width = window.innerWidth ;//- 5.5;
		area.height = window.innerHeight ;//- 5.5;
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
	constructor(imgsrc, type, speed, name, x, y, RadiusDetection, numFrame, animation) {
		this.image = new Image();
		this.image.src = imgsrc;
		//this.type = type; //enemy, friend or neutral
		this.jumpspeed = 15;
		this.curspeedX = 0;
		this.speedX = speed;
		this.speedY = 0;
		this.maxSpeedY = 8;
		this.curspeedY = 0;
		this.name = name;
		this.posX = x;
		this.posY = y;
		this.gravity = 1;
		this.hitGround = false;
		this.type = type;
		this.Frame = numFrame || 1;
		this.frameNum = 0;
		this.countAnimate = 1;
		this.radius = RadiusDetection || 0;
		this.lastDir = "right";
		this.animation = animation || 0;
	}
	update() {
		var box = gameArea.ctx;
		this.Sprite();
		/*box.drawImage(this.image, this.countAnimate*this.image.width/this.Frame, 0*this.image.height/this.animation, this.image.width/this.Frame, this.image.height/this.animation,this.posX, this.posY, this.image.width/this.Frame, this.image.height/this.animation);*/
	}
	Sprite() {
		/*var LoopFrame = 56; //How many second do we need to complete the animation.
		var perFrame = LoopFrame/this.Frame; //How many frame do we need to the next animation.
		this.countAnimate = Math.floor(this.frameNum / perFrame);
		if (this.frameNum > LoopFrame - 2) {
			this.frameNum = 0;
		}*/
		if(this.curspeedX == 0 && this.curspeedY == 0 && this.hitGround == true) {
			this.Still();
		}
		if (this.curspeedX != 0 && this.curspeedY == 0 && this.hitGround == true) {
			if ((this.curspeedX == (this.speedX-1)/2) || (this.curspeedX == -((this.speedX-1)/2))) {
				this.Jogging();
			}
			else {
				this.Running();
			}
		}
		if (!this.hitGround) {
			this.Jumping();
		}
	}
	Still() {
		var box = gameArea.ctx;
		var LoopFrame = 70; //How many second do we need to complete the animation.
		var perFrame = LoopFrame/this.Frame; //How many frame do we need to the next animation.
		this.countAnimate = Math.floor(this.frameNum / perFrame);
		if (this.frameNum > LoopFrame - 2) {
			this.frameNum = 0;
		}
		if (this.lastDir == "left") {
			box.drawImage(this.image, this.countAnimate*this.image.width/this.Frame, 1*this.image.height/this.animation, this.image.width/this.Frame, this.image.height/this.animation,this.posX, this.posY, this.image.width/this.Frame, this.image.height/this.animation);
		}
		if (this.lastDir == "right") {
			box.drawImage(this.image, this.countAnimate*this.image.width/this.Frame, 0*this.image.height/this.animation, this.image.width/this.Frame, this.image.height/this.animation,this.posX, this.posY, this.image.width/this.Frame, this.image.height/this.animation);
		}
	}
	Running() {
		var box = gameArea.ctx;
		var LoopFrame = 35; //How many second do we need to complete the animation.
		var perFrame = LoopFrame/this.Frame; //How many frame do we need to the next animation.
		this.countAnimate = Math.floor(this.frameNum / perFrame);
		if (this.frameNum > LoopFrame - 8) {
			this.frameNum = 0;
		}
		if (this.curspeedX > 0) {
			box.drawImage(this.image, this.countAnimate*this.image.width/this.Frame, 2*this.image.height/this.animation, this.image.width/this.Frame, this.image.height/this.animation,this.posX, this.posY, this.image.width/this.Frame, this.image.height/this.animation);
		}
		if (this.curspeedX < 0) {
			box.drawImage(this.image, this.countAnimate*this.image.width/this.Frame, 3*this.image.height/this.animation, this.image.width/this.Frame, this.image.height/this.animation,this.posX, this.posY, this.image.width/this.Frame, this.image.height/this.animation);
		}
	}
	Jogging() {
		var box = gameArea.ctx;
		var LoopFrame = 49; //How many second do we need to complete the animation.
		var perFrame = LoopFrame/this.Frame; //How many frame do we need to the next animation.
		this.countAnimate = Math.floor(this.frameNum / perFrame);
		if (this.frameNum > LoopFrame - 8) {
			this.frameNum = 0;
		}
		if (this.curspeedX > 0) {
			box.drawImage(this.image, this.countAnimate*this.image.width/this.Frame, 2*this.image.height/this.animation, this.image.width/this.Frame, this.image.height/this.animation,this.posX, this.posY, this.image.width/this.Frame, this.image.height/this.animation);
		}
		if (this.curspeedX < 0) {
			box.drawImage(this.image, this.countAnimate*this.image.width/this.Frame, 3*this.image.height/this.animation, this.image.width/this.Frame, this.image.height/this.animation,this.posX, this.posY, this.image.width/this.Frame, this.image.height/this.animation);
		}
	}
	Jumping() {
		var box = gameArea.ctx;
		var LoopFrame = 14; //How many second do we need to complete the animation.
		var perFrame = LoopFrame/this.Frame; //How many frame do we need to the next animation.
		this.countAnimate = Math.floor(this.frameNum / perFrame);
		if (this.frameNum > LoopFrame - 7) {
			this.frameNum = 0;
		}
		if (this.lastDir == "right" && ((this.curspeedY != 0) || (this.curspeedY == 0 && !this.hitGround))) {
			if (this.curspeedY <= -10) {
				box.drawImage(this.image, this.countAnimate*this.image.width/this.Frame, 4*this.image.height/this.animation, this.image.width/this.Frame, this.image.height/this.animation,this.posX, this.posY, this.image.width/this.Frame, this.image.height/this.animation);
			}
			if (this.curspeedY > -10 && this.curspeedY <= 0) {
				box.drawImage(this.image, this.countAnimate*this.image.width/this.Frame, 6*this.image.height/this.animation, this.image.width/this.Frame, this.image.height/this.animation,this.posX, this.posY, this.image.width/this.Frame, this.image.height/this.animation);
			}
			if (this.curspeedY > 0) {
				box.drawImage(this.image, this.countAnimate*this.image.width/this.Frame, 8*this.image.height/this.animation, this.image.width/this.Frame, this.image.height/this.animation,this.posX, this.posY, this.image.width/this.Frame, this.image.height/this.animation);
			}
		}
		if (this.lastDir == "left"  && ((this.curspeedY != 0) || (this.curspeedY == 0 && !this.hitGround))) {
			if (this.curspeedY <= -10) {
				box.drawImage(this.image, this.countAnimate*this.image.width/this.Frame, 5*this.image.height/this.animation, this.image.width/this.Frame, this.image.height/this.animation,this.posX, this.posY, this.image.width/this.Frame, this.image.height/this.animation);
			}
			if (this.curspeedY > -10 && this.curspeedY <= 0) {
				box.drawImage(this.image, this.countAnimate*this.image.width/this.Frame, 7*this.image.height/this.animation, this.image.width/this.Frame, this.image.height/this.animation,this.posX, this.posY, this.image.width/this.Frame, this.image.height/this.animation);
			}
			if (this.curspeedY > 0) {
				box.drawImage(this.image, this.countAnimate*this.image.width/this.Frame, 9*this.image.height/this.animation, this.image.width/this.Frame, this.image.height/this.animation,this.posX, this.posY, this.image.width/this.Frame, this.image.height/this.animation);
			}
		}
	}
	newPos() {
		this.posX += this.curspeedX;
		this.curspeedY += this.speedY + this.gravity;
		if (this.curspeedY > this.maxSpeedY) {
			this.curspeedY = this.maxSpeedY;
		}
		this.posY += this.curspeedY;
		this.hitObject();
		this.hitObject(Map1);
	}
	jump() {
		this.speedY = -(this.jumpspeed);
	}
	hitObject(obj) {
		if (obj == null) {
			var bottom = gameArea.Box.height-this.image.height/this.animation;
			var left = 0;
			var right = gameArea.Box.width-this.image.width/this.Frame;
			var top = 0;
			if (this.posY > bottom){
				this.posY = bottom;
				this.hitGround = true;
			}
			else if(this.posY < bottom) {
				this.hitGround = false;
			}
			if (this.posY < top) {
				this.posY = top;
			}
			if (this.posX < left) {
				this.posX = left;
			}
			if (this.posX > right) {
				this.posX = right;
			}
			if (this.hitGround) {
				this.curspeedY = 0;
			}
		}
		if(obj != null) {
			var bottom = obj.posY + obj.image.height;
			var left = obj.posX - this.image.width/this.Frame;
			var right = obj.posX + obj.image.width;
			var top = obj.posY - this.image.height/this.animation;
			if (this.posX > left && this.posX < right && this.posY > top && this.posY < bottom) {
				if (this.posY - top <= 8 && this.posX - left != 5 && this.posX - right != -5) {
					this.posY = top;
					this.hitGround = true;
				}
				if (this.posY - bottom >= -15 && this.posX - left != 5 && this.posX - right != -5) {
					this.posY = bottom;
					this.curspeedY = 0;
				}
				if (this.posX - left <= 5){
					this.curspeedX = 0;
					this.posX = left;
				}
				if (this.posX - right >= -5){
					this.curspeedX = 0;
					this.posX = right;
				}
			}
			if (this.hitGround) {
				this.curspeedY = 0;
			}
		}
	}
}
var updateFrame = function() {
	gameArea.clear();
	speedChar();
	DetectChar();
	if (gameArea.keys && (gameArea.keys[37] || gameArea.keys[65])) {
		Player.curspeedX = -Player.speedX;
		Player.lastDir = "left";
	}
	if (gameArea.keys && (gameArea.keys[39] || gameArea.keys[68])) {
		Player.curspeedX = Player.speedX;
		Player.lastDir = "right";
	}
	if (gameArea.keys && (gameArea.keys[38] || gameArea.keys[32] || gameArea.keys[87]) && (Player.hitGround == true)) {
		Player.jump();
	}
	if (gameArea.keys && gameArea.keys[16]) {
		if (gameArea.keys && (gameArea.keys[37] || gameArea.keys[65]) && Player.hitGround) {
			Player.curspeedX = -((Player.speedX-1)/2);
			Player.lastDir = "left";
		}
		if (gameArea.keys && (gameArea.keys[39] || gameArea.keys[68]) && Player.hitGround) {
			Player.curspeedX = (Player.speedX-1)/2;
			Player.lastDir = "right";
		}
	}
	FrameNumber();
	Map1.draw();
	updateChar();
	report(gameArea.ctx, Player.posX, Player.posY, Player.curspeedX, Player.curspeedY, Player.hitGround, gameArea.Box.width, gameArea.Box.height, 4, 0, Player);
	report(gameArea.ctx, Enemy1.posX, Enemy1.posY, Enemy1.curspeedX, Enemy1.curspeedY, Enemy1.hitGround, gameArea.Box.width, gameArea.Box.height, 1500, 0, Enemy1);
}
function FrameNumber() {
	gameArea.frameNum += 1;
	Player.frameNum += 1;
	Enemy1.frameNum += 1;
}
function DetectChar() {
	Enemy1.Detection();
}
function speedChar() {
	Player.curspeedX = 0;
	Player.speedY = 0;
	Enemy1.curspeedX = 0;
	Enemy1.speedY = 0;
}
function updateChar() {
	Player.newPos();
	Player.update();
	Enemy1.newPos();
	Enemy1.update();
}

function report(ctx, px, py, sx, sy, hg, width, height, PositionX, PositionY, ObAni) {
	this.ctx = ctx;
	this.ctx.font = "15px Arial";
	this.ctx.fillText("Width: " + width, PositionX, PositionY + 15);
	this.ctx.fillText("Height: " + height, PositionX, PositionY + 30);
	this.ctx.fillText("Position X: " + px, PositionX, PositionY + 45);
	this.ctx.fillText("Position Y: " + py, PositionX, PositionY + 60);
	this.ctx.fillText("Speed X: " + sx, PositionX, PositionY + 75);
	this.ctx.fillText("Speed Y: " + sy, PositionX, PositionY + 90);
	this.ctx.fillText("Hit the ground: " + hg, PositionX, PositionY + 105);
	this.ctx.fillText("Count animation: " + ObAni.countAnimate, PositionX, PositionY + 120);
	this.ctx.fillText("Frame animation: " + ObAni.frameNum, PositionX, PositionY + 135);
}

class Map {
	constructor(tilesrc, x, y) {
		this.image = new Image();
		this.image.src = tilesrc;
		this.posX = x;
		this.posY = y;
	}
	draw() {
		var box = gameArea.ctx;
		box.drawImage(this.image, this.posX, this.posY);
	}
}

class EnemyCharacter extends Character{
	Aggressive() {
		var PlayerX = Player.posX;
		var PlayerY = Player.posY;
		if(this.posX != PlayerX) {
			if ((this.posX - PlayerX) < -3) {
				this.curspeedX = this.speedX;
				Enemy1.lastDir = "right";
			}
			if ((this.posX - PlayerX) > 3) {
				this.curspeedX = -(this.speedX);
				Enemy1.lastDir = "left";
			}
		}
	}
	Normal() {

	}
	Defensive() {
		return;
	}
	Detection() {
		var container = gameArea.ctx;
		var xCen = (this.posX + ((this.image.width/this.Frame)/2));
		var yCen = (this.posY + ((this.image.height/this.animation)/2));
		var xPly = (Player.posX + ((Player.image.width/this.Frame)/2));
		var yPly = (Player.posY + ((Player.image.height/this.animation)/2));
		var radius = this.radius;
		container.beginPath();
		container.arc(xCen, yCen, radius, 0, 2*Math.PI);
		container.save();
		container.fillStyle = "rgba(255,0,0,0.5)";
		container.fill();
		container.restore();
		var Rr = radius + (Player.image.width/this.Frame);
		var Dx = xCen - xPly;
		var Dy = yCen - yPly;
		var Sqrt = (Dx*Dx)+(Dy*Dy);
		var detected = (Rr > Math.sqrt((Dx*Dx)+(Dy*Dy)));
		if (detected) {
			this.Aggressive();
		}
		if (!detected) {
			this.Normal();
		}
	}
	newPos() {
		this.posX += this.curspeedX;
		this.curspeedY += this.speedY + this.gravity;
		if (this.curspeedY > this.maxSpeedY) {
			this.curspeedY = this.maxSpeedY;
		}
		this.posY += this.curspeedY;
		this.hitObject();
		this.hitObject(Map1);
	}
}
window.onload = Startgame();
