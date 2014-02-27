function PostCtrl($scope) {
	//defaults
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