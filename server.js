// Require our dependencies
var express = require('express'),
  exphbs = require('express-handlebars'),
  http = require('http'),
  mongoose = require('mongoose'),
  twitter = require('twitter'),
  routes = require('./Routes/routes');
  //config = require('./config'),
  //streamHandler = require('./utils/streamHandler');

// Create an express instance and set a port variable
var app = express();
var port = process.env.PORT || 3000;

// Connect to our mongo database
mongoose.connect('mongodb://reactUser:pass@ds045097.mongolab.com:45097/meandb', function (params,b) {
  console.log(params,b);
});

// Set handlebars as the templating engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Disable etag headers on responses
app.disable('etag');


// Isomorphic Route
app.get('/Isomorphic', routes.index);


// Set /public as our static content dir
app.use("/", express.static(__dirname));

var client ={
  consumer_key: 'g7g5pyaYDt19cWlaX05LqSK6q',
  consumer_secret: '3TyvT2tO9wfcMKvVhw7c9GfdwbPyLgUzkp9vIJ6L1fS5PH0VrZ',
  access_token_key: '1427660108-Sbn9cQXqgNiufHXVXbH7TWrn4XooxxutGEGJYMx',
  access_token_secret: 'OxwooObOGBkyxikCwUkut9wkCAysoEXEE2g0xS7PcrUON'
}

// Create a new ntwitter instance
var twit = new twitter(client);

// Fire this bitch up (start our server)
var server = http.createServer(app).listen(port, function() {
  console.log('Express server listening on port ' + port);
});

// Initialize socket.io
var io = require('socket.io').listen(server);
// Set a stream listener for tweets matching tracking keywords
//twit.stream('statuses/filter',{ track: 'javascript'}, function(stream){
//   stream.on('data', function(data) {
//     console.log(data)
//   });
//});