myApp.controller('addPtoTController', function($scope, $location, userFactory, tournamentFactory, drawFactory, $routeParams){
	console.log('in the add players to tournament controller')
	$scope.users = [];
	$scope.tournaments = [];
	$scope.draws = []
	$scope.players =[]
	$scope.isUserLoggedIn = true;
	// console.log($routeParams)
	$scope.logout = logout;
	
	userFactory.getUser(function(response){
		$scope.user = response;
		console.log('this is the tournamentController get User response:', response);
	})

	function logout() {
		userFactory.logout()
		$scope.user = null; 
		$location.path('/')
	}
	tournamentFactory.getTournamentName($routeParams, function(data){
		$scope.tournament = data.data
	})

	tournamentFactory.getUsers($routeParams, function(data){
		console.log('here are the players', data.users)
		$scope.players = data.users;
	})

	userFactory.getUsers(function(data){
		console.log(' in the addPtoTController', data)
		$scope.users = data;
	})


	
	$scope.addUtoT = function(user){

		// console.log('in the addUtoT function in controller', user);
		tournamentFactory.addUtoT($routeParams, user, function(data){
			// console.log('this is your data:', data);
			var players = $scope.players
			players.push(data.data);
			// console.log(players);
			$scope.players = players
			console.log($scope.users);
			$scope.users.splice($scope.users.indexOf(user), 1);
		})


		userFactory.tournamentStatus(user, function(data){
			console.log('going to update tournament status for user');
			// $scope.users = data;
			// var index = $scope.players.indexOf(user);
			// $scope.players[index] = data.data;
		})
	}

	$scope.createDraw = function(newDraw){
		console.log(newDraw)
		console.log($routeParams)
		console.log('want to create a draw')
		drawFactory.addDraw(newDraw, $routeParams, function(data){
			console.log(data);
			$scope.draws = data
			$scope.newDraw = {}
		})
	}

	drawFactory.getDraws(function(data){
		console.log('made it back from the factory')
		console.log(data)
		$scope.draws = data
		

	})

	$scope.viewDraw = function(draw){
		console.log('attempting to show one draw')
		$location.path('/showDraw/'+draw._id)
	}

	$scope.removePlayer = function(player){
		$scope.players.splice($scope.players.indexOf(player), 1);

		tournamentFactory.removePlayer($routeParams, player, function(data){
			console.log('this is the callback data in controller', data);
			$scope.users.push(data);
		})
	}

	$scope.removeDraw = function(draw){
		console.log('hi')
		drawFactory.removeDraw(draw, function(data){
			console.log('hi')
			console.log(draw)
			$scope.draws.splice($scope.draws.indexOf(draw));
		})
	}



})