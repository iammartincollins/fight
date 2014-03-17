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
			this.messages.push("SUCCESS: " + msg + "<h1>hi</h1>");
			break;
		case "Fail":
			this.messages.push("FAIL: " + msg);
			break;
		case "Info":
			this.messages.push("INFO: " + msg);
			break;
		case "Special":
			this.messages.push("SPECIAL: " + msg);
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

Samurai.prototype.doDefend = function () {
	if (getRandom(1, 10) === 1) {
		fightApp.globalLog.addMsg("Special", this.player + " gains +10hp!");
		this.health += 10;
	}
	return this.defence;
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
		this.brawlerSpecial(p1);
		this.brawlerSpecial(p2);
		makeHPPretty(p1);
		makeHPPretty(p2);
	}
};

// Fight.prototype.anAttack = function(giver, receiver) {
// 	//atk = (giver.type === "Ninja" && getRandom(1, 20) === 1) ? giver.attack * 2 : giver.attack; //ninja special
// 	var result = ( receiver.evade >= Math.random() ) ? 0 : (atk - receiver.defence); //calculate attack dmg
// 	//if (receiver.type === "Samurai" && result === 0  && getRandom(1, 10) === 1) { receiver.health += 10; } // samurai special
// 	receiver.health -= result;
// 	this.fLog.push(giver.player + " attacks for " + result + " damage! " + receiver.player + " is now on " + receiver.health + " health!");
// };

Fight.prototype.brawlerSpecial = function(p) {
	if (p.type === "Brawler" && p.health < (p.maxHealth / 5) && p.buff === false) {
		p.defence += 10;
		p.buff = true;
	}
};