var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt = require('jsonwebtoken');
var jwtSecret = 'aasjidfjiodsjfiosajfs';
var bCrypt = require('bcrypt-nodejs');
var xssFilters = require('xss-filters');

// using bcrypt to create a password hash
var createHash = function(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

// using bcrypt to check passwords at login
var isValidPassword = function(user, password){
    return bCrypt.compareSync(password, user.password);
}

module.exports = (function(){
  return {
    register: function(req, res){
      var body = req.body;
      console.log('we\'re in the back end controller');
      console.log(body);
      if(!body.newUser.first_name || !body.newUser.password || !body.newUser.location || !body.newUser.last_name || !body.newUser.email || !body.newUser.phoneNumber || !body.newUser.program){
        return res.status(400).end('Must fill out all fields');
      }

      // we prevent XSS by filtering the data
      var filteredfirst_name = xssFilters.inHTMLData(body.newUser.first_name);
      var filteredlast_name = xssFilters.inHTMLData(body.newUser.last_name);
      var filteredlocation = xssFilters.inHTMLData(body.newUser.location);
      //check this password
      var filteredpassword = xssFilters.inHTMLData(body.newUser.password);
      var filteredemail = xssFilters.inHTMLData(body.newUser.email);
      var filteredphoneNumber = xssFilters.inHTMLData(body.newUser.phoneNumber);
      var filteredprogram = xssFilters.inHTMLData(body.newUser.program);
      // create a user and use bCrypt to hash the password
      // console.log('this is the filtered phone number' + filteredphoneNumber)
      var new_user = new User({first_name: filteredfirst_name,
                               last_name: filteredlast_name,
                               location:filteredlocation,
                              phoneNumber: filteredphoneNumber, 
                              program: filteredprogram,
                              email: filteredemail,  
                              password: createHash(filteredpassword), 
                              inTournament: body.newUser.inTournament});
      new_user.save()
        .then(function success(user){
          // if the user saves successfully we will create a jwt
          console.log('this is the user');
          console.log(user);
          var token = jwt.sign(
              {
                _id: user._id,
                email: user.email,
                location: user.location, 
                phoneNumber: user.phoneNumber, 
                program: user.program, 
                first_name: user.first_name,
                last_name: user.last_name, 
                inTournament: user.inTournament
              },
              jwtSecret,
              {expiresIn: 86400} 
          );
          // and send that token back to the client
          console.log('this it the token', token);
          res.send({
            token: token,
            user: {_id: user._id, logged_in: true, first_name: user.first_name, last_name: user.last_name, location: user.location, program: user.program, inTournament: user.inTournament }
          });
        }).then(function error(err){
          console.log('this is the error:', err)
          res.status(500).end("Internal Server Error");
        })
    },
    login: function(req, res){
      var body = req.body;
      var filteredemail = xssFilters.inHTMLData(body.email);
      console.log('this is the fitlered email: ', filteredemail)
      User.findOne({email: filteredemail}).exec()
        .then(function success(user){
          // console.log('we in the login authController', user.email);
          // console.log('we in the login authController', body.email);
          console.log('we in the login authController', isValidPassword(user, body.password));
          if(body.email !== user.email || !isValidPassword(user, body.password)){
            res.status(401).end("Invalid login credentials");
            return;
          }
          var token = jwt.sign({
                _id: user._id,
                email: user.email,
                location: user.location, 
                phoneNumber: user.phoneNumber, 
                program: user.program, 
                first_name: user.first_name,
                last_name: user.last_name, 
                inTournament: user.inTournament
          }, jwtSecret);
          console.log('this is the token:', token);
          res.send({
            token: token,
            user: {_id: user._id, email: user.email, logged_in: true, first_name: user.first_name}
          });
        })
        .then(null, function error(err){
          console.log('hi at the err');
          res.status(500).end("Internal Server Error");
        })
    },
    authenticated: function(req, res){
      var user = req.user;
      // console.log('in the authcontroller authenicated function', user);
      user.logged_in = true;
      console.log('we in the authew func in auth controller', user);
      res.send(user);
    },
    getUsers: function(req, res){
      console.log('in the backend controller! yay!')
      User.find({}, function(err, users){
        if(err){
          console.log("made an error getting the customers")
        }
        else{
          console.log("got all the users")
          res.json(users)

        }
      })
    }, 
    update: function(req, res){
      // console.log('authController updatemethod req.body', req.body)
      console.log('this is the req.params.id', req.params.id)
      User.update({_id: req.params.id}, req.body, function(err, user){
        if(err){
          console.log('error in updating user');
        }
        else{
          console.log('successfully updated user in database', user);
          res.redirect('/user/'+req.params.id);
        }
      })
    }, 

    getUser: function(req, res){
      User.findOne({_id: req.params.id}, function(err, user){
        if(err){
          console.log('trouble finding user..')
        }
        else{
          console.log('success in obtaining the user')
          res.json(user);
        }
      })
    }


    // end of method
  }
})();
