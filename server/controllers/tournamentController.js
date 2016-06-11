var mongoose = require('mongoose');
var User = mongoose.model('User')
var Tournament = mongoose.model('Tournament')

module.exports = (function(){
	return {
		addTournament : function(req, res){
			console.log(req.body)

			var newTournament = new Tournament(req.body)
			newTournament.save(function(err, results){
				if(err){
					console.log('error creating the tournament')
				}
				else{
					console.log('going to create a tournament!')
					res.json(results)
				}
			})
		},

		getTournaments: function(req, res){
			Tournament.find({}, function(err, results){
				if(err){
					console.log('made an error getting tournaments')
				}
				else{
					console.log('got all the tournaments')
					res.json(results)
				}
			})
		},

		deleteTournament: function(req, res){
			Tournament.remove({_id: req.params.id}, function(err, tournament){
				if(err){
					console.log('made an error deleting a tournament')
				}
				else{
					console.log('deleting a tournament')
					res.json(tournament)
				}
			})
		}, 
		addPtoT: function(req, res){
			console.log(req.body)
			console.log("this is someones id", req.body._id)
			console.log(req.params.id);
			Tournament.findOne({_id : req.params.id}, function(err, tournament){
				var player = req.body
				console.log('this is the player', player)
				// User._tournament = tournament._id;
				tournament.users.push(player)
				tournament.save(function(err){
					if(err){
						console.log('an error happend adding a player to the tournament')
					}
					else{
					User.findOne({_id: req.body._id}, function(err, user){
					user._tournament.push(tournament)
					user.save(function(err){
						if(err){
							console.log('error in saving the tournament to the player')
						}
						else{
							console.log('added a tournament to a specific player')
							console.log(user)
								res.json(user)
						}
					})


					})

					}
				})

			})

		},

		 getName: function(req, res){
		 	Tournament.findOne({_id: req.params.id},function(err, name){
		 		if(err){
		 			console.log('this is the error'. err)
		 		}
		 		else{
		 			console.log('this is the tournament name', name)
		 			res.json(name)
		 		}
		 	})
		 },

		 getUsers: function(req, res){
			console.log('in the get users function in back end')
			console.log(req.params.id)
			Tournament.findOne({_id : req.params.id})
			.populate('users')
			.exec(function(err, tournament){
				if(err){
					console.log('found an error getting all users in tournament')
				}
				else{
					console.log('success! this is your callback info:', tournament)
					res.json(tournament)
				}
			})
		},
		updateTournstatus: function(req, res){
			console.log('updating tournament status', req.body._id);
			User.update({_id: req.body._id}, {inTournament : 'tournament'}, function(err, user){
				if(err){
					console.log('error in updating users tournament status');
				}
				else{
					console.log('this is the update tournament status callback:', user);
					res.json(user);
				}
			})
		}, 
		removePlayer: function(req, res){
			// console.log(' remove player req.body: ', req.body);
			// console.log(' remove tournament from player', req.params.id);
			User.findOneAndUpdate({_id: req.body._id}, { $pull: { _tournament: req.params.id } }, function(err, user){
				if(err){
					console.log('error in removing player from the tournament', err);
				}
				else{
					console.log(user);
					// res.json(user);
				}
			})
			Tournament.findOneAndUpdate({_id : req.params.id}, { $pull: { users: req.body._id }}, function(err, tournament){
				if(err){
					console.log('error in removing player from the tournament', err);
				}
				else{
					console.log('this is the tournament being that will be passed back', tournament);
					// res.json(tournament)
				}
			})
			User.findOneAndUpdate({_id: req.body._id}, {inTournament : 'none'}, function(err, user){
				if(err){
					console.log('error in updating users tournament status');
				}
				else{
					// console.log('this is the update tournament status callback:');
					res.json(user);
				}
			})

		}




	}
})()