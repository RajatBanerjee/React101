/** @jsx React.DOM */
var React = require('react');

var notificationComponent = React.createClass({

	render: function() {
		return (
			<div className={"notification-bar"}>
				<p>There are {this.count} new tweets
					<a href="#top" onCLick={this.props.showNewTweets}> Click here to see them</a>
				</p>
			</div>
		);
	}

});

module.exports = notificationComponent;