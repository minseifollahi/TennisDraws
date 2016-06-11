 var mongoose = require('mongoose');

var Schema = mongoose.Schema

var UserSchema = new mongoose.Schema({
	_tournament: [{type: Schema.Types.ObjectId, ref: 'Tournament'}],
	first_name: String,
	last_name: String, 
	location: String, 
	program: String, 
	phoneNumber: Number, 
	email: String, 
	password: String,
	_Draw: {type: Schema.Types.ObjectId, ref: 'Draw'}, 
	inTournament: String
})

var TournamentSchema = new mongoose.Schema({
	name:String,
	date:Date,
	users: [{type: Schema.Types.ObjectId, ref: 'User'}],
	draws: [{type: Schema.Types.ObjectId, ref: 'Draw'}]
})


var DrawSchema = new mongoose.Schema({
	name: String,
	users: [{type: Schema.Types.ObjectId, ref: 'User'}],
	_tournament: [{type: Schema.Types.ObjectId, ref:'Tournament'}]
})


mongoose.model('User', UserSchema);
mongoose.model('Draw', DrawSchema);
mongoose.model('Tournament', TournamentSchema);


