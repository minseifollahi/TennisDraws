// heres an example!
var auth = require('./../controllers/authController.js');
var tourn = require('./../controllers/tournamentController.js');
var draw = require('./../controllers/drawController.js');

module.exports = function(app){

	app.post('/register', function(req, res){
		console.log('made it to the post route!')
		auth.register(req, res);
	})

	app.post('/login', function(req, res){
		console.log('we at the route');
		auth.login(req, res);
	});
	app.get('/authenticated', function(req, res){
		console.log('we at the authenticated route');
		auth.authenticated(req,res);
	});

	app.get('/getUsers', function(req, res){
		console.log('at the route to get the users!')
		auth.getUsers(req, res)
	});


	app.post('/addTournament', function(req, res){
		console.log('made it to the route to add a tournament')
		tourn.addTournament(req, res)
	})

	app.get('/tournaments', function(req, res){
		console.log('getting the tournaments routes')
		tourn.getTournaments(req, res)
	})

	app.post('/tournaments/:id/delete', function(req, res){
		console.log('route to delete a tournament')
		tourn.deleteTournament(req, res)
	})


	app.post('/tournaments/:id/update', function(req, res){
		console.log('route to add user to tournament'); 
		tourn.addPtoT(req, res);
	})

		// app.post('/tournaments', function(req, res){
	// 	console.log('made it to the route to create a draw!')
	// 	draw.createDraw(req, res)
	// })

	app.get('/showdraws', function(req, res){
		console.log('made it to the route to get all the draws')
		draw.getDraws(req, res)
	})

	app.post('/update', function(req, res){
		console.log('at the update route')
		auth.update(req, res);
	});
	app.get('/getAllPlayers', function(req, res){
		console.log('at the getAllPlayers route')
		auth.getAllPlayers(req, res);
	})

	app.post('/createdraws/:id', function(req, res){
		console.log('trying to create a draw')
		draw.createDraw(req, res);
	})

	app.get('/draw/:id', function(req, res){
		console.log('attempting to grab a particular draw')
		draw.getDraw(req, res)
	})

	app.get('/playerfdraw/:id', function(req, res){
		console.log('attempting to grab players from the particular tournament of the draw')
		draw.getplayers(req, res)
	})

	app.post('/addUtoD/:id', function(req, res){
		console.log('made it to the route to add a player to a draw')
		draw.addUtoD(req, res)
	
	})

	app.get('/getplayers/:id', function(req, res){
		console.log('in the route to get all players')
		draw.displayPlayers(req, res)
	})

	app.get('/getTournamentName/:id', function(req, res){
		console.log('attempting to grab tournament name')
		tourn.getName(req, res)
	})

	app.get('/getUsersinTourn/:id', function(req, res){
		console.log('trying to get all the users associated to a specific tournament')
		tourn.getUsers(req, res);
	})

	app.post('/removeDraw', function(req, res){
		draw.removeDraw(req, res)
	})

	app.post('/update/:id', function(req, res){
		console.log('at the update route')
		auth.update(req, res);
	});
	app.get('/user/:id', function(req, res){
		auth.getUser(req, res);
	})

	app.post('/updateTournstatus', function(req, res){
		console.log('updating tournament status for user');
		tourn.updateTournstatus(req, res);
	})
	app.post('/removePlayer/:id', function(req, res){
		console.log('removing player from tournament'); 
		tourn.removePlayer(req, res);
	})

	app.post('/draws/:id/removeplayerfromD', function(req, res){
		console.log('want to remove a player froma  draw')
		draw.removePlayer(req, res)
	})

}