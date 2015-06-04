/** @jsx React.DOM */
var React = require('react');

var pp_heroComponent = React.createClass({

	render: function() {
		var data = this.props.heroData;		
		return (
			<div>
				<div id="sideNav">
					<img src={data.thumbnailImageUrl}/>
				</div>
				<div id="visualizer">
				<img src={data.genericImageUrl}/>
				</div>
			</div>
		);
	}

});


module.exports = pp_heroComponent;