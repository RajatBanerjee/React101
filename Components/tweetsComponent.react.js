/** @jsx React.DOM */

var React = require('react');
var Tweet = require('./tweetComponent.react.js');
var NotificationBar = require('./notificationComponent.react.js');
module.exports = Tweets = React.createClass({

  // Render our tweets
  render: function(){

    // Build list items of single tweet components using map
    var content = this.props.tweets.map(function(tweet){
      return (
        <Tweet key={tweet._id} tweet={tweet} />
      )
    });

    // Return ul filled with our mapped tweets
    return (
      <div className="tweets">{content}</div>
    )

  }

}); 