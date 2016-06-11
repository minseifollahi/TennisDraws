myApp.factory('userFactory', function($http, API_URL, AuthTokenFactory){
	// console.log('userFactory')
	var user = null; 
	var players = [];
	var factory = {};
	factory.register = register; 
	factory.login = login;
	factory.logout = logout; 
	factory.getUser = getUser;
	factory.updateUser = updateUser;
	factory.getUsers = getUsers;
	factory.tournamentStatus = tournamentStatus

	return factory;

	function register(newUser){
		console.log('registering user');
		return $http.post('/register', {newUser}).then(function success(response){
        user = response.data.user;
        AuthTokenFactory.setToken(response.data.token);
        // console.log('hit')
        return response;
      })
	}

	function login(email, password){
		// console.log('hit the login factory');
		console.log(email)
		return $http.post(API_URL + '/login', {
	        email: email,
	        password: password
      }).then(function success(response){
        user = response.data.user;
        // console.log(response.data.token)
        AuthTokenFactory.setToken(response.data.token);
        return response;
      });
	}


	function getUser(callback){
		// console.log('in the getUser factory');
		if(AuthTokenFactory.getToken()){
        	$http.get(API_URL + '/authenticated').then(function success(response){
        		// console.log(response);
        		user = response.data
        		callback(user);
        	})
		} 
		else {
	        user = null;
        	return $q.reject({ data: 'client has no auth token' });
		}
	}

	function updateUser(routeParams, info, callback){
		// console.log(user);
		// console.log(info) 
		// console.log('in the factory'); 
		$http.post('/update/'+routeParams.id, info).then(function success(response){
			console.log("this is the update user response:", response.data);
			callback(response.data);
		})
	}

	function getUsers(callback){
		console.log('made it to the get users in the factory')
		$http.get('/getUsers').then(function(data){
			console.log('back in the factory');
			console.log(data.data);
			callback(data.data);
		})
	}


	function logout() {
		user = null; 
		AuthTokenFactory.setToken();
	}

	function tournamentStatus(user, callback){
		// console.log('in the tournamentStatus function of the factory')
		$http.post('/updateTournstatus', user).then(function(data){
			console.log(data);
			callback(data);
		})
	}



})