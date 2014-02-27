function PostCtrl($scope) {
	$scope.playerOneType = "Ninja";
	$scope.playerTwoType = "Ninja";
	$scope.fightLog = [];


	$scope.beginFight = function() {
		$scope.player1 = newWarrior($scope.playerOneType, "Player 1");
		$scope.player2 = newWarrior($scope.playerTwoType, "Player 2");
		$scope.fight = new Fight($scope.player1, $scope.player2, $scope.fightLog);
		//$scope.winner = combat($scope.player1, $scope.player2, $scope.goesFirst, $scope.fightLog);
	};
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

function getRandom(low, high) {
	return Math.floor(Math.random() * (high - low + 1)) + low;
}

function newWarrior(type, name) {
	if (type === "Ninja") {
		return new Ninja(name);
	} else if (type === "Samurai") {
		return new Samurai(name);
	} else {
		return new Brawler(name);
	}
}