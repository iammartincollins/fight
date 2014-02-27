function Warrior (warriorType) {
}

Warrior.prototype.getHealth = function() {
	return this.health;
};

/**
 * Ninja child
 */

Ninja.prototype = new Warrior();
Ninja.prototype.constructor = Ninja;

function Ninja (name) {
	this.player = name;
	this.health = getRandom(40, 60);
	this.attack = getRandom(60, 70);
	this.defence = getRandom(20, 30);
	this.speed = getRandom(90, 100);
	this.evade = getRandom(0.3, 0.5);
}

/**
 * Samurai child
 */

Samurai.prototype = new Warrior();
Samurai.prototype.constructor = Samurai;

function Samurai (name) {
	this.player = name;
	this.health = getRandom(40, 60);
	this.attack = getRandom(60, 70);
	this.defence = getRandom(20, 30);
	this.speed = getRandom(90, 100);
	this.evade = getRandom(0.3, 0.5);
}

/**
 * Brawler child
 */

Brawler.prototype = new Warrior();
Brawler.prototype.constructor = Brawler;

function Brawler (name) {
	this.player = name;
	this.health = getRandom(40, 60);
	this.attack = getRandom(60, 70);
	this.defence = getRandom(20, 30);
	this.speed = getRandom(90, 100);
	this.evade = getRandom(0.3, 0.5);
}


function Fight (p1, p2, fLog) {
	this.first = this.whoFirst(p1, p2);
	fLog.push(this.first.player + " begins the fight!");
}

Fight.prototype.whoFirst = function(p1, p2) {
	if (p1.speed > p2.speed) {
		//p1 wins
		return p1;
	} else if (p1.speed === p2.speed && p1.defence < p2.defence) {
		//p1 wins
		return p1;
	} else {
		//p2 wins
		return p2;
	}
};