function Startgame() {
	gameArea.start();
	Player = new Character("material/Character/element1.png", "player", 5, "Robert", 10, 650);
	Enemy1 = new EnemyCharacter("material/Character/enemy.png", "enemy", 2.5, "Zombie", 1450, 650);
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
	constructor(imgsrc, type, speed, name, x, y, width, height) {
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
	}
	update() {
		var box = gameArea.ctx;
		box.drawImage(this.image, this.posX, this.posY, this.image.width, this.image.height);
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
			var bottom = gameArea.Box.height-this.image.height;
			var left = 0;
			var right = gameArea.Box.width-this.image.width;
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
			var left = obj.posX - this.image.width;
			var right = obj.posX + obj.image.width;
			var top = obj.posY - this.image.height;
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
	Player.curspeedX = 0;
	Player.speedY = 0;
	Enemy1.curspeedX = 0;
	Enemy1.speedY = 0;
	Enemy1.Detection();
	if (gameArea.keys && (gameArea.keys[37] || gameArea.keys[65])) {
		Player.curspeedX = -Player.speedX;
		Player.image.src = "material/Character/element1_2.png";
	}
	if (gameArea.keys && (gameArea.keys[39] || gameArea.keys[68])) {
		Player.curspeedX = Player.speedX;
		Player.image.src = "material/Character/element1.png";
	}
	if (gameArea.keys && (gameArea.keys[38] || gameArea.keys[32] || gameArea.keys[87]) && (Player.hitGround == true)) {
		Player.jump();
	}
	if (gameArea.keys && gameArea.keys[16]) {
		if (gameArea.keys && (gameArea.keys[37] || gameArea.keys[65]) && Player.hitGround) {
			Player.curspeedX = -((Player.speedX-1)/2);
			Player.image.src = "material/Character/element1_2.png";
		}
		if (gameArea.keys && (gameArea.keys[39] || gameArea.keys[68]) && Player.hitGround) {
			Player.curspeedX = (Player.speedX-1)/2;
			Player.image.src = "material/Character/element1.png";
		}
	}
	gameArea.frameNum += 1;
	Map1.draw();
	updateChar();
	report(gameArea.ctx, Player.posX, Player.posY, Player.curspeedX, Player.curspeedY, Player.hitGround, gameArea.Box.width, gameArea.Box.height, 4, 0);
	report(gameArea.ctx, Enemy1.posX, Enemy1.posY, Enemy1.curspeedX, Enemy1.curspeedY, Enemy1.hitGround, gameArea.Box.width, gameArea.Box.height, 1400, 0);
}
function updateChar() {
	Player.newPos();
	Player.update();
	Enemy1.newPos();
	Enemy1.update();
}

function report(ctx, px, py, sx, sy, hg, width, height, PositionX, PositionY) {
	this.ctx = ctx;
	this.ctx.font = "15px Arial";
	this.ctx.fillText("Width: " + width, PositionX, PositionY + 15);
	this.ctx.fillText("Height: " + height, PositionX, PositionY + 30);
	this.ctx.fillText("Position X: " + px, PositionX, PositionY + 45);
	this.ctx.fillText("Position Y: " + py, PositionX, PositionY + 60);
	this.ctx.fillText("Speed X: " + sx, PositionX, PositionY + 75);
	this.ctx.fillText("Speed Y: " + sy, PositionX, PositionY + 90);
	this.ctx.fillText("Hit the ground: " + hg, PositionX, PositionY + 105);
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
				this.image.src = "material/Character/enemy.png";

			}
			if ((this.posX - PlayerX) > 3) {
				this.curspeedX = -(this.speedX);
				this.image.src = "material/Character/enemy_1.png";

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
		var xCen = (this.posX + (this.image.width/2));
		var yCen = (this.posY + (this.image.height/2));
		var xPly = (Player.posX + (Player.image.width/2));
		var yPly = (Player.posY + (Player.image.height/2));
		var radius = 500;
		container.beginPath();
		container.arc(xCen, yCen, radius, 0, 2*Math.PI);
		container.strokeStyle = "rgba(255,0,0,1)";
		container.stroke();
		var Rr = radius + (Player.image.width/2);
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
