function PostCtrl($scope) {
	
	$scope.player1 = {"type": "Ninja"};
	$scope.player2 = {"type": "Samurai"};

	$scope.playerOneType = "Ninja";
	$scope.playerTwoType = "Ninja";


	$scope.getMan = function() {
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
			//todo
			break;
	}
}

function makeNinja(man) {
	man = {
		"type": "Ninja",
		"health": getRandom(40, 60),
		"defence": getRandom(20, 30)
	};

	return man;
}

function makeSamurai(man) {
	man = {
		"type": "Samurai",
		"health": getRandom(60, 100),
		"defence": getRandom(35, 40)
	};

	return man;
}

function getRandom(low, high) {
	return Math.floor(Math.random() * (high - low + 1)) + low;
}