myApp.controller('drawController', function($scope, $location, $routeParams, userFactory, tournamentFactory, drawFactory){
	console.log('made it to the drawController!')
	console.log('this is the routeparams',$routeParams)

	$scope.isUserLoggedIn = true;
	$scope.draws = []
	$scope.tournaments = []
	$scope.players= []
	$scope.users = []
	$scope.logout = logout; 

	userFactory.getUser(function(response){
      $scope.user = response;
      // console.log('this is the tournamentController get User response:', response);
    })

	function logout() {
		userFactory.logout()
		$scope.user = null; 
		$location.path('/')
	}

	drawFactory.getDraw($routeParams, function(data){
		// console.log('made it back from the factory')
		// console.log(data)
		$scope.draw = data
	})

	drawFactory.getTournamentplayers($routeParams, function(data){
		// console.log('made it back from the factory from grabbing players!')
		// console.log('hopefully these are the people from the tournament', data.player.users)
		// console.log(data.users)
			$scope.players = data.users

	})

	$scope.addUtoD = function(user){
		// console.log(user)
		// console.log('in the controller!')
		drawFactory.addUtoD($routeParams, user, function(data){
			// console.log(data)
			$scope.users.push(data);
			drawFactory.getTournamentplayers($routeParams, function(users){
				$scope.players = users.users
			})
		})
	}

	drawFactory.getPlayerfromDraw($routeParams, function(data){
		// console.log('in the controller to grab all the players in the tournament')
		// console.log(data)
		$scope.users = data.users
		
	})

	$scope.viewcreateddraw = function(data){
		// console.log(data)
		$location.path('/viewcreateddraw/'+data)
	}

	$scope.RemoveUfromD = function(player){
		$scope.users.splice($scope.users.indexOf(player), 1);
		drawFactory.RemoveUfromD($routeParams, player, function(data){
			console.log('made it back to the contorler from removing a player from the draw', data)
		})
		drawFactory.getTournamentplayers($routeParams, function(users){
			$scope.players = users.users
		})
	}

	
	
})