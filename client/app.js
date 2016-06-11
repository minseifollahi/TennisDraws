var myApp = angular.module('Myapp', ['ngRoute']);

myApp.config(function($httpProvider, $routeProvider){
  $httpProvider.interceptors.push('AuthInterceptor');

  $routeProvider
    .when('/', {
		controller: 'homeController',
		// you can set the controller here rather than in the indext.html
		templateUrl: "partials/user/registration.html"
    })
    .when('/user/:id', {
	controller: 'userController',
	templateUrl: "partials/user/user.html"
    })
    .when('/showTournaments', {
      controller: 'tournamentController',
      templateUrl: "partials/user/showTournaments.html"
    })
    .when('/show/:id', {
      controller:'addPtoTController',
      templateUrl: "partials/user/showTournament.html"
    })
    .when('/showDraw/:id', {
      controller: 'drawController',
      templateUrl: "partials/user/showDraw.html"
    })
    .when('/viewcreateddraw/:id', {
      controller: 'createddrawController', 
      templateUrl:"partials/user/viewcreateddraw.html"
    })
});
