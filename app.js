function PostCtrl($scope) {
	$scope.playerOneType = "Ninja";
	$scope.playerTwoType = "Ninja";
	$scope.goesFirst = "-";
	$scope.fightLog = [];


	$scope.beginFight = function() {
		$scope.player1 = populatePlayer($scope.player1 , $scope.playerOneType);
		$scope.player2 = populatePlayer($scope.player2 , $scope.playerTwoType);

		$scope.goesFirst = whoFirst($scope.player1, $scope.player2);
		$scope.fightLog.push($scope.goesFirst + " goes first");

		$scope.winner = combat($scope.player1, $scope.player2, $scope.goesFirst, $scope.fightLog);
	};
}

function whoFirst(p1, p2) {
	if (p1.speed > p2.speed) {
		return goesFirst = "Player one";
	} else if (p2.speed > p1.speed) {
		return goesFirst = "Player two";
	} else {
		if (p1.defence < p2.defence) {
			return goesFirst = "Player one";
		} else {
			return goesFirst = "Player two";
		}
	}
}

function combat(p1, p2, whoFirst, fLog) {
	pOneHP = p1.health;
	pTwoHP = p2.health;
	whosTurn = whoFirst;

	for (i = 1; i <= 60;i++) {

		if(whosTurn === "Player one") {
			fLog.push("Player one attacks for " + anAttack(p1, p2) + " damage!");
			whosTurn = "Player two";
		} else {
			fLog.push("Player two attacks for " + anAttack(p2, p1) + " damage!");
			whosTurn = "Player one";
		}

	}
}

function anAttack(giver, receiver) {
	var result = ( receiver.evade <= Math.random() ) ? 0 : (giver.attack - receiver.defence);
	return result;
 }

/*init players*/

function populatePlayer(player, type) {
	switch (type) {
		case "Ninja":
			return makeNinja(player);
		case "Samurai":
			return makeSamurai(player);
		case "Brawler":
			return makeBrawler(player);
	}
}

function makeNinja(man) {
	man = {
		"type": "Ninja",
		"health": getRandom(40, 60),
		"attack": getRandom(60, 70),
		"defence": getRandom(20, 30),
		"speed": getRandom(90, 100),
		"evade": getRandom(0.3, 0.5)
	};

	return man;
}

function makeSamurai(man) {
	man = {
		"type": "Samurai",
		"health": getRandom(60, 100),
		"attack": getRandom(75, 80),
		"defence": getRandom(35, 40),
		"speed": getRandom(60, 80),
		"evade": getRandom(0.3, 0.4)
	};

	return man;
}

function makeBrawler(man) {
	man = {
		"type": "Brawler",
		"health": getRandom(90, 100),
		"attack": getRandom(65, 75),
		"defence": getRandom(40, 50),
		"speed": getRandom(40, 65),
		"evade": getRandom(0.3, 0.35)
	};

	return man;
}

function getRandom(low, high) {
	return Math.floor(Math.random() * (high - low + 1)) + low;
}