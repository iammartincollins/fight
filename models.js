function Warrior () {
}

Warrior.prototype.anAttack = function (defender) {
	console.log("Attacking player is " + this.player);
	if (defender.attemptEvade()) {
		fightApp.globalLog.addMsg("Fail", defender.player + " evaded the attack!");
	} else {
		defender.takeDamage(this.doAttack() - defender.doDefend(), this);
	}
};

Warrior.prototype.doAttack = function () {
	return this.attack;
};

Warrior.prototype.doDefend = function () {
	return this.defence;
};

Warrior.prototype.attemptEvade = function () {
	var result = ( this.evade <= Math.random() ) ? true : false;
	return result;
};

Warrior.prototype.takeDamage = function (dmg, attacker) {
	fightApp.globalLog.addMsg("Success", attacker.player + " attacked for " + dmg + " damage!");
	this.health -= dmg;
};

//=============================
// Message log object

function FightLog () {
	console.log("Log created");
	this.messages = [];
}

FightLog.prototype.addMsg = function (type, msg) {
	switch (type) {
		case "Success":
			this.messages.push(['success', msg]);
			break;
		case "Fail":
			this.messages.push(["fail", msg]);
			break;
		case "Info":
			this.messages.push(["info", msg]);
			break;
		case "Special":
			this.messages.push(["special", "SPECIAL! " + msg]);
			break;
		default:
			this.messages.push(msg);
	}
};

//=============================

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

Ninja.prototype.doAttack = function () {
	if (getRandom(1, 20) === 1) {
		fightApp.globalLog.addMsg("Special", this.player + " gains double attack for 1 turn!");
		return this.attack * 2;
	}
	return this.attack;
};

//=============================

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

Samurai.prototype.attemptEvade = function () {
	var result = ( this.evade <= Math.random() ) ? true : false;
	if (result && getRandom(1, 10) === 1) {
		this.health += 10;
		fightApp.globalLog.addMsg("Special", this.player + " gains +10hp!");
	}
	return result;
};

//=============================

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

Brawler.prototype.takeDamage = function (dmg, attacker) {
	fightApp.globalLog.addMsg("Success", attacker.player + " attacked for " + dmg + " damage!");
	this.health -= dmg;
	if (this.health < (this.maxHealth / 5) && this.buff === false) {
		this.defence += 10;
		this.buff = true;
		fightApp.globalLog.addMsg("Special", this.player + " gains 10 defence!");
	}
};

//==============================

function Fight (p1, p2, fLog) {
	this.first = this.whoFirst(p1, p2);
	this.fLog = fLog;

	fLog.addMsg("Success", this.first.player + " begins the fight!");
	fLog.addMsg("Success", this.combat(p1, p2).player + " is the winner!");
	//this.combat(p1, p2);
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
		fightApp.globalLog.addMsg("Info", "New turn! P1 hp: " + p1.health + " P2 hp: " + p2.health);
		if(whosTurn === p1.player) {
			p1.anAttack(p2);
			whosTurn = p2.player;
		} else {
			p2.anAttack(p1);
			whosTurn = p1.player;
		}
		if(p1.health <= 0) { //determine winner
			return p2;
		} else if (p2.health <= 0) {
			return p1;
		}
		makeHPPretty(p1);
		makeHPPretty(p2);
	}
};