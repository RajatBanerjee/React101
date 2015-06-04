/** @jsx React.DOM */
var React = require('react');

var pp_TitleComponent = React.createClass({

	render: function() {
		var data = this.props.titleData;
		return (
			<div id="prd-title-modeule">
				<div id="prd-title" className="prd-title">
					<h1>{data.title}</h1>
				</div>
				<div id="prd-artist" className="prd-artist">By 
					<a href={data.ProductPageUrl} className="artistLink">{data.artist}</a>
				</div>
				<div className="prd-link-divider">|</div>
				<div id="prd-type" className="prd-type">{data.productType}</div>
				<div className="prd-link-divider">|</div>
				<div id="prd-itemnum" className="prd-itemnum">Item #: 
					<span id="ZoneProductID">{data.sku}</span>
				</div>
			</div>
		);
	}

});

module.exports = pp_TitleComponent;