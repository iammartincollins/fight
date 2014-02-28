function Warrior () {
}

Ninja.prototype = new Warrior();
Ninja.prototype.constructor = Ninja;

function Ninja (name) {
	this.player = name;
	this.health = getRandom(40, 60);
	this.attack = getRandom(60, 70);
	this.defence = getRandom(20, 30);
	this.speed = getRandom(90, 100);
	this.evade = getRandomDec(0.3, 0.5);
	this.type = "Ninja";
}

Samurai.prototype = new Warrior();
Samurai.prototype.constructor = Samurai;

function Samurai (name) {
	this.player = name;
	this.health = getRandom(60, 100);
	this.attack = getRandom(75, 80);
	this.defence = getRandom(35, 40);
	this.speed = getRandom(60, 80);
	this.evade = getRandomDec(0.3, 0.4);
	this.type = "Samurai";
}

Brawler.prototype = new Warrior();
Brawler.prototype.constructor = Brawler;

function Brawler (name) {
	this.player = name;
	this.health = getRandom(90, 100);
	this.maxHealth = this.health;
	this.attack = getRandom(65, 75);
	this.defence = getRandom(40, 50);
	this.speed = getRandom(40, 65);
	this.evade = getRandomDec(0.3, 0.35);
	this.buff = false;
	this.type = "Brawler";
}


function Fight (p1, p2, fLog) {
	this.first = this.whoFirst(p1, p2);
	this.fLog = fLog;

	fLog.push(this.first.player + " begins the fight!");
	fLog.push(this.combat(p1, p2).player + " is the winner!");
}

Fight.prototype.whoFirst = function(p1, p2) {
	if (p1.speed > p2.speed) {
		return p1;
	} else if (p1.speed === p2.speed && p1.defence < p2.defence) {
		return p1;
	} else {
		return p2;
	}
};

Fight.prototype.combat = function(p1, p2) {
	whosTurn = this.first.player;
	for (i = 1; i <= 60; i++) {
		if(p1.health <= 0) { //determine winner
			return p2;
		} else if (p2.health <= 0) {
			return p1;
		}
		if(whosTurn === p1.player) {
			this.anAttack(p1, p2);
			whosTurn = p2.player;
		} else {
			this.anAttack(p2, p1);
			whosTurn = p1.player;
		}
		this.brawlerSpecial(p1);
		this.brawlerSpecial(p2);
	}
};

Fight.prototype.anAttack = function(giver, receiver) {
	atk = (giver.type === "Ninja" && getRandom(1, 20) === 1) ? giver.attack * 2 : giver.attack; //ninja special
	var result = ( receiver.evade >= Math.random() ) ? 0 : (atk - receiver.defence); //calculate attack dmg
	if (receiver.type === "Samurai" && result === 0  && getRandom(1, 10) === 1) { receiver.health += 10; } // samurai special
	receiver.health -= result;
	this.fLog.push(giver.player + " attacks for " + result + " damage! " + receiver.player + " is now on " + receiver.health + " health!");
};

Fight.prototype.brawlerSpecial = function(p) {
	if (p.type === "Brawler" && p.health < (p.maxHealth / 5) && p.buff === false) {
		p.defence += 10;
		p.buff = true;
	}
};
