myApp.controller('homeController', function($scope, $location, userFactory){
	$scope.register = register;
	$scope.login = login;


	function register(newUser){
		// console.log('scope register function');
		newUser.inTournament = 'none';
		// console.log('this is the newUser: ', newUser)
		userFactory.register(newUser).then(function success(response){
			// console.log("in the userFactory"); 
			// console.log('this is the register response', response.data.user);
			$scope.user = response.data.user;
			// console.log('this is the scope: ', $scope.user._id)
			$location.url('/user/' + $scope.user._id);
		})
		}
	function login(email, password){
		userFactory.login(email, password).then(function success(response){
        console.log(response.data)
        $scope.user = response.data.user;
        // console.log($scope.user._id);
        $location.path('/user/' + $scope.user._id);
      });
    }
})