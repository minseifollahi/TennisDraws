var mongoose = require('mongoose');
var User = mongoose.model('User');
var Draw = mongoose.model('Draw');
var Tournament = mongoose.model('Tournament')

module.exports = (function(){
	return {
		createDraw: function(req, res){
			console.log('this is the info from the html pg', req.body)
			console.log('this is the route id', req.params.id)

		Tournament.findOne({_id: req.params.id}, function(err, tournament){
				var draw = new Draw(req.body);
				console.log('this is the new draw', draw)
				draw._tournament = tournament._id;
				draw.save(function(err){
					tournament.draws.push(draw);
					tournament.save(function(err){
						if(err){
							console.log('error in adding the draw to the tournament')
						}
						else{
							console.log('added the draw to the tournament')
								res.json(draw)
						}
					})
				})


		})

		},

		// start of get method
		getDraws: function(req, res){
			console.log('made it to the get all method in the controller!')
			Draw.find({}, function(err, draws){
				if(err){
					console.log('did not get all the draws')
				}
				else{
					console.log('success!')
					console.log(draws)
					res.json(draws)
				}
			})
		},

		getDraw: function(req, res){
			console.log('made it to the back end to grab the particular draw by id')
			console.log(req.params.id)
			Draw.findOne({_id: req.params.id}, function(err, draw){
				if(err){
					console.log('made an error grabbing a particular draw')
				}
				else{
					console.log('was able to grab the correct draw!')
					res.json(draw)
				}
			})
		},

		getplayers: function(req, res){
			console.log('made it to the back end to grab the players!')
			console.log(req.params.id)
			Draw.findOne({_id: req.params.id}, function(err, draw){
				console.log(draw)
				console.log('the tournament id:',draw._tournament)
				// newtournament = draw._tournament
				// console.log(newtournament)
				// console.log(newtournament.users)
				Tournament.findOne({_id: draw._tournament})
					.populate('users')
					.exec(function(err, tourn){
						if(err){
							console.log('made an error with tournament find one')
						}
						else{
							console.log(tourn)
							// console.log('this is the players', player.name);
							// console.log('goodjob!')
							res.json(tourn)
						}
					})

			})

		},
		// end of get method

		addUtoD: function(req, res){
			// console.log(req.body)
			// console.log(req.params)

			Draw.findOne({_id: req.params.id}, function(err, draw){
				var user = req.body
				// console.log('this is the user', user)
				draw.users.push(user)
				// console.log('this is the draw with the added user', draw)
				draw.save(function(err){
					if(err){
						console.log('made an error adding the user to a tournament')
					}
					else{
						// console.log('added the user to a draw')
						User.findOne({_id: req.body._id}, function(err, user){
							console.log('this is the user im looking for', user)
							// user._Draw.push(draw)
							user.save(function(err){
								if(err){
									console.log('made an error adding the draw to the user')
								}
								else{
									console.log('added a draw to a user')
									console.log('this is the user that will be sent to the factory', user)
									res.json(user)
								}
							})
						})
					}
				})
			})
			User.findOneAndUpdate({_id: req.body._id}, {inTournament : 'draw'}, function(err, user){
				if(err){
					console.log('error in updating users tournament status');
				}
				else{
					console.log('this is the update tournament status callback:');
					// res.json(user);
				}
			})
		},
		displayPlayers: function(req, res){
			console.log('trying to display players!')
			console.log('this is the draw id', req.params.id)
			Draw.findOne({_id: req.params.id})
			.populate('users')
			.exec(function(err, player){
				if(err){
					console.log('made an error getting all the players to display')
				}
				else{
					console.log('here are all the players', player)
					console.log('on the way to getting the players to display')
					res.json('player', {player: player})
				}
			})
		},

		removeDraw: function(req, res){
			console.log('in the backend controller')
			console.log('this is the req.body._id', req.body._id)
			Draw.findOneAndUpdate({_id: req.body._id}, {$pull: {_tournament: req.params.id}, function(err, draw){
				if(err){
					console.log('made an error removing the tournament from the draw')
				}
				else{
					console.log('removed a tournament from the draw')
					Tournament.findOne({_id: req.params.id}, {$pull: {draws: req.body._id}}, function(err, tournament){
						if(err){
							console.log('made an error removing a draw from a tournament')
						}
						else{
							console.log('removed the draw from the tournament')
						}
					})
				}
			}})
		},

		removePlayer: function(req, res){
			// console.log('this is req.body', req.body);
			// console.log('this is req.params', req.params);
			Draw.findOneAndUpdate({_id:req.params.id}, {$pull:{users: req.body._id}}, function(err, draw){
				if(err){
					console.log('made an error removing the user from the tournament')
				}
				else{
					// console.log('removed the player from the draw!')
					User.findOneAndUpdate({_id: req.body._id}, {$pull: {_Draw: req.params.id}, function(err, user){
						if(err){
							console.log('error in removing the draw from the tournament')
						}
						else{
							console.log('successfully removed the draw from the user')

						}
					}})
				}
			})
			User.findOneAndUpdate({_id: req.body._id}, {inTournament : 'tournament'}, function(err, user){
				if(err){
					console.log('error in updating users tournament status');
				}
				else{
					console.log('this is the update tournament status callback:');
					// res.json(user);
				}
			})
		}

// end of the methods!

	}
})();