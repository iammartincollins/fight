function PostCtrl($scope) {
	
	$scope.man = {
		"type": "Ninja",
		"health": 50,
		"defence": 20
		};


	$scope.getMan = function(manobj) {
		//console.log(manobj.health);
		//$scope.man = makeNinja(manobj);
		$scope.man = populatePlayer(manobj, manobj.type);
	};
}

function populatePlayer(player, type) {
	switch (type) {
		case "Ninja":
			return makeNinja(player);
			//break;
		case "Samurai":
			//todo
			break;
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

function getRandom(low, high) {
	return Math.floor(Math.random() * (high - low + 1)) + low;
}