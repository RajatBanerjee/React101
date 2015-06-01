/** @jsx React.DOM */
var React = require('react');

var notificationComponent = React.createClass({

	render: function() {
		var count = this.props.count;
		return (
			 <div className={"notification-bar" + (count > 0 ? ' active' : '')}>
				<p>There are {count} new tweets
					<a href="#top" onClick={this.props.onshowNewTweets}> Click here to see them</a>
				</p>
			</div>
		);
	}

});

module.exports = notificationComponent;