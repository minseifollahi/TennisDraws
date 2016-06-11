myApp.controller('userController', function($scope, $location, userFactory, $routeParams){
	$scope.logout = logout; 
	$scope.updateUser = updateUser;
	$scope.showTournaments = showTournaments 


	// console.log('first userController ping');
	
    
    userFactory.getUser(function(response){
      $scope.user = response;
      console.log('this is the userController get User response:', response);
    })


	function logout() {
		userFactory.logout()
		$scope.user = null; 
		$location.path('/')
	}
	
	function updateUser(editUser) {
		// console.log($scope.user, $scope.editUser)
		userFactory.updateUser($routeParams, editUser, function(data){
			// console.log('made it back to the factory')
			$scope.user = data;
		})
	}

	function showTournaments(){
		$location.path('/showTournaments')
	}

	// end of function

})