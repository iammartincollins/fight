
var fightApp = angular.module('fightApp', []);

fightApp.controller('PostCtrl', function ($scope, newWarrior) {
	//defaults
	$scope.playerOneType = "Ninja";
	$scope.playerTwoType = "Ninja";
	$scope.fightLog = [];

	$scope.beginFight = function() {
		$scope.fightLog.length = 0;
		$scope.player1 = newWarrior.getType($scope.playerOneType, "Player 1");
		$scope.player2 = newWarrior.getType($scope.playerTwoType, "Player 2");
		$scope.fight = new Fight($scope.player1, $scope.player2, $scope.fightLog);
	};
});

fightApp.filter('ignore', function() {
	return function(list, item) {
		items = {};
		angular.forEach(list, function(value, key) {
			if (key != item) {
				items[key] = value;
			}
		});
		return items;
	};
});

fightApp.factory('newWarrior', function() {
	return {
		getType: function(type, name) {
			if (type === "Ninja") {
				return new Ninja(name);
			} else if (type === "Samurai") {
				return new Samurai(name);
			} else {
				return new Brawler(name);
			}
		}
	};
});

function getRandom(low, high) {
	return Math.floor(Math.random() * (high - low + 1)) + low;
}

function getRandomDec(low, high) {
	return result = Math.round( (Math.random() * (high - low) + low) * Math.pow(10, 2) ) / Math.pow(10, 2);
}

function makeHPPretty(p) {
	p.health = (p.health <= 0) ? 0 : p.health;
}