function PostCtrl($scope) {
	//defaults
	$scope.playerOneType = "Ninja";
	$scope.playerTwoType = "Ninja";
	$scope.fightLog = [];

	$scope.beginFight = function() {
		$scope.fightLog.length = 0;
		$scope.player1 = newWarrior($scope.playerOneType, "Player 1");
		$scope.player2 = newWarrior($scope.playerTwoType, "Player 2");
		$scope.fight = new Fight($scope.player1, $scope.player2, $scope.fightLog);
	};
}

function getRandom(low, high) {
	return Math.floor(Math.random() * (high - low + 1)) + low;
}

function getRandomDec(low, high) {
	return result = Math.round( (Math.random() * (high - low) + low) * Math.pow(10, 2) ) / Math.pow(10, 2);
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