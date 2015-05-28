var JSX = require('node-jsx').install(),
  React = require('react');


module.exports = {

  index: function(req, res) {

      // Render our 'home' template
      res.render('home');
    
  },

  page: function(req, res) {
    // Fetch tweets by page via param
    Tweet.getTweets(req.params.page, req.params.skip, function(tweets) {

      // Render as JSON
      res.send(tweets);

    });
  }

}