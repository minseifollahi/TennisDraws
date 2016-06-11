myApp.factory('tournamentFactory', function($http, API_URL){
// console.log('tournamentFactory')

var factory= {};
var tournaments = []

factory.addTournament = addTournament;
factory.getTournaments = getTournaments;
factory.deleteTournament = deleteTournament;
factory.addUtoT = addUtoT;
factory.getTournamentName = getTournamentName; 
factory.getUsers = getUsers;
factory.removePlayer = removePlayer;

function addTournament(newTournament, callback){
	console.log('in the tournament factory');
	$http.post('/addTournament', newTournament).then(function(data){
		console.log("this is the data", data)
		tournaments.push(data.data)
		console.log(tournaments)
		callback(tournaments)
	})

}

function getTournaments(callback){
	$http.get('/tournaments').then(function(data){
		// console.log(data)
		tournaments = data.data
		callback(tournaments);
	})
}

function deleteTournament(tournament, callback){
	console.log('in the factory to delete something')
	console.log(tournament._id)
	$http.post('/tournaments/'+tournament._id+'/delete').then(function(data){
		console.log('deleted it!')
		tournaments.splice(tournaments.indexOf(tournament), 1)
		callback(tournaments)
	})
}

function addUtoT(routeparams, user, callback){
	// console.log('in the factory to add User to tournament model'); 
	// console.log('this is the routeparams:', routeparams, user);
	$http.post('/tournaments/'+routeparams.id+'/update', user).then(function(data){
		// console.log('this is the addUtoT data:', data);
		console.log('in the factory');
		console.log(data);
		callback(data);
	});

}

function getTournamentName(routeparams, callback){
	$http.get('getTournamentName/'+routeparams.id).then(function(data){
		callback(data);
	})
}

function getUsers(routeparams, callback){
	// console.log('tournamentFactory get users function')
	$http.get('getUsersinTourn/'+routeparams.id).then(function(data){
		// console.log('in the tournament factory, this is all the users in a tournament', data)
		callback(data.data);
	})
}

function removePlayer(routeparams, player, callback){
	$http.post('removePlayer/'+routeparams.id, player).then(function(data){
		// console.log(data.data);
		var x = data.data
		x.inTournament = 'none'
		// console.log(x);
		callback(x);
	})
}
















// end of functions
return factory;
});