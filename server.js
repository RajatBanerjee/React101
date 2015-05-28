// Require our dependencies
var express = require('express'),
  exphbs = require('express-handlebars'),
  http = require('http'),
  mongoose = require('mongoose'),
  isomorphicRoutes = require('./Routes/isomorphicRoutes'),
  config = require('./config'),
  Twitter = require('twitter')
  tweetController= require('./Controllers/tweetController');
  
  //streamHandler = require('./utils/streamHandler');

// Create an express instance and set a port variable
var app = express();
var port = process.env.PORT || 3000;

// Connect to our mongo database
// try the local mongo db
mongoose.connect( config.mongodb.localMongo, function(error){
  if(error){
    console.log(error);
  }else{
    console.log("COnnected to DB")
  }
});


// Set handlebars as the templating engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Disable etag headers on responses
app.disable('etag');


// Isomorphic Route
app.get('/Isomorphic', isomorphicRoutes.index);


// Set /public as our static content dir
app.use("/", express.static(__dirname));


var server = http.createServer(app).listen(port, function() {
  console.log('Express server listening on port ' + port);
});

var twit = new Twitter(config.twitter);
// Initialize socket.io
var io = require('socket.io').listen(server);

// Set a stream listener for tweets matching tracking keywords
twit.stream('statuses/filter',{ track: 'javascript'}, function(stream){
  tweetController(stream,io);
});