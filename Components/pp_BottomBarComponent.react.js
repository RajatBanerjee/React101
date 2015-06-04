/** @jsx React.DOM */
var React = require('react');

var pp_BottomBarComponent = React.createClass({
			
	render: function() {
		var data = this.props.bottomBarData
		return (
			<div>
				<div id="chat"></div>
				<div id="info"></div>
				<div id="price">
					<span>{data.price}</span>
					<span>Arrives By {data.arrivesBy}</span>
				</div>
				<div id="addToCart"></div>
				<div id="myGal"></div>
				<div id="googleStoreLogo"></div>
			</div>
		);
	}

});

module.exports = pp_BottomBarComponent;
