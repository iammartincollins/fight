function PostCtrl($scope) {
	$scope.playerOneType = "Ninja";
	$scope.playerTwoType = "Ninja";


	$scope.beginFight = function() {
		//console.log(manobj.health);
		//$scope.man = makeNinja(manobj);
		$scope.player1 = populatePlayer($scope.player1 , $scope.playerOneType);
		$scope.player2 = populatePlayer($scope.player2 , $scope.playerTwoType);
	};
}

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