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
	this.fLog = fLog;
	fLog.push(this.first.player + " begins the fight!");
	this.winner = this.combat(p1, p2);
	fLog.push(this.winner.player + " is the winner!");
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

Fight.prototype.combat = function(p1, p2) {
	whosTurn = this.first.player;
	for (i = 1; i <= 60;i++) {
		if(p1.health <= 0) {
			return p2;
		} else if (p2.health <= 0) {
			return p1;
		}
		if(whosTurn === p1.player) {
			this.fLog.push("Player one attacks for " + this.anAttack(p1, p2) + " damage! P2 is now on " + p2.health + " health!");
			whosTurn = p2.player;
		} else {
			this.fLog.push("Player two attacks for " + this.anAttack(p2, p1) + " damage! P1 is now on " + p1.health + " health!");
			whosTurn = p1.player;
		}
	}
};

Fight.prototype.anAttack = function(giver, receiver) {
	var result = ( receiver.evade <= Math.random() ) ? 0 : (giver.attack - receiver.defence);
	receiver.health = receiver.health - result;
	return result;
};