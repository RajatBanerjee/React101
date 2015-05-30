// Require our dependencies
var express = require('express'),
  exphbs = require('express-handlebars'),
  http = require('http'),
  mongoose = require('mongoose'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser');
  bunyan =require('bunyan');
  reqLogger = require('morgan');
  PrettyStream = require('bunyan-prettystream');
  /**
   * Modules required
   */
var isomorphicRoutes = require('./Routes/isomorphicRoutes'),
    indexRoute = require('./Routes/indexRoute'),
    config = require('./config'),
    Twitter = require('twitter'),
    tweetController= require('./Controllers/tweetController');
  

// Create an express instance and set a port variable
var app = express();
var port = process.env.PORT || 3000;
var prettyStdOut = new PrettyStream();
prettyStdOut.pipe(process.stdout);

var log = new bunyan({
  name: 'React101',
  streams: [
    {
      stream: prettyStdOut,
      level: 'info'
    },
    {
      path: 'React101.log',
      level: 'trace'
    }
  ]
});
app.use(reqLogger('dev'));
// Set handlebars as the templating engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Disable etag headers on responses
app.disable('etag');


// Connect to our mongo database
// try the local mongo db
mongoose.connect( config.mongodb.localMongo, function(error){
  if(error){
    console.log(error);
  }else{
    console.log("COnnected to DB")
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public/')));

// Isomorphic Route
app.use('/Isomorphic', isomorphicRoutes);
app.use("/", indexRoute)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var server = http.createServer(app).listen(port, function() {
  var addr = server.address();
  log.info('App starting on : '+addr.address + ' Listening on port :' + addr.port);
});

var twit = new Twitter(config.twitter);
// Initialize socket.io
var io = require('socket.io').listen(server);

// Set a stream listener for tweets matching tracking keywords
twit.stream('statuses/filter',{ track: 'javascript'}, function(stream){
  tweetController(stream,io);
});