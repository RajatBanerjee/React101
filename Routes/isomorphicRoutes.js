var JSX = require('node-jsx').install(),
  React = require('react'),
  TweetsApp = require('../Components/tweetApp.react.js'),
  Tweet = require('../Models/tweetModel'),
  express = require('express'),
  router = express.Router();

router.get('/',function(req,res,next){
  // res.send("olo");
    //  // Call static model method to get tweets in the db
    Tweet.findTweets(0,0, function(tweets, pages) {
      var markup = React.renderComponentToString(
        TweetsApp({
          tweets: tweets
        })
      );
      // Render our 'home' template
      res.render('home', {
        markup: markup, // Pass rendered react markup
        state: JSON.stringify(tweets) // Pass current state to client side
      });

    });
});

router.get("/page/:page/:skip", function(req,res,next){
  Tweet.findTweets(req.params.page, req.params.skip, function(tweets) {

      // Render as JSON
      res.send(tweets);

    });
});

module.exports = router;