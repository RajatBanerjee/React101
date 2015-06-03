// Require our dependencies
var express = require('express'),
  exphbs = require('express-handlebars'),
  http = require('http'),
  mongoose = require('mongoose'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  log = require('./Utils/logger'),
  reqLogger = require('morgan');
  /**
   * Modules required
   */
var isomorphicRoutes = require('./Routes/isomorphicRoutes'),
    indexRoute = require('./Routes/indexRoute'),
    productRoute = require('./Routes/productRoute'),
    config = require('./config'),
    Twitter = require('twitter'),
    tweetController= require('./Controllers/tweetController');
  

// Create an express instance and set a port variable
var app = express();
var port = process.env.PORT || 3000;


app.use(reqLogger('dev'));
// Set handlebars as the templating engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Disable etag headers on responses
app.disable('etag');


// Connect to our mongo database
// try the local mongo db
// mongoose.connect( config.mongodb.localMongo, function(error){
//   if(error){
//     console.log(error);
//   }else{
//     console.log("COnnected to DB")
//   }
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public/')));

// Isomorphic Route
app.use('/Isomorphic', isomorphicRoutes);
app.use('/Product', productRoute);
app.use("/", indexRoute)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

var server = http.createServer(app).listen(port, function() {
  var addr = server.address();
  log.info('App starting on : '+addr.address + ' Listening on port :' + addr.port);
});

var twit = new Twitter(config.twitter);
// Initialize socket.io
var io = require('socket.io').listen(server);

// Set a stream listener for tweets matching tracking keywords
// twit.stream('statuses/filter',{ track: 'javascript'}, function(stream){
//   //tweetController(stream,io);
// });