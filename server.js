// require express so that we can build an express app
var express = require('express');
// require path so that we can use path stuff like path.join
var path = require('path');
var cors = require('cors');
// instantiate the app
var app = express();
var jwtSecret = 'aasjidfjiodsjfiosajfs';
var expressJwt = require('express-jwt');
var bodyParser = require('body-parser'); 


// set up a static file server that points to the "client" directory
app.use(express.static(path.join(__dirname, '/client')));
app.use(cors());
app.use(bodyParser.json());
app.use(expressJwt({ secret: jwtSecret })
          .unless({ path: ['/', '/login', '/register', '/favicon.ico', '/viewDraws', '/createdraws', '/viewcreateddraw/:id', '/update/:id'] }));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);


app.listen(8000, function() {
  console.log('cool stuff on: 8000');
});