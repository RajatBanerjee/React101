var React = require('react'),
  express = require('express'),
  router = express.Router()
  httpRequest = require('../Utils/HttpRequestModule'),
  log=  require('../Utils/logger'),
  productModel = require('../Models/productModel');

var productPageComponent = require('../Components/pp_pageApp.react.js');
  /*
  	router configuration after /Product/*
   */
  
  router.get("/", function(req,res){
  	log.info("--------------arrived here---------");


    var meta= httpRequest.makeGetRequest("http://api.art.com/ECommerceAPI.svc/jsonp/SEOMetaInfoGet?apiKey=519BAAC8E607413CA1FC043C92D08AAD&sessionId=A0F866D6907D411395E5CEDB6C359357&pageSourceType=ProductPage&itemId=9045049&categoryID=6126&pageNumber=1",null,function(err,data){
      metaTags= data.d.metaTags;
      
    });
  	var url ="http://api.art.com/EcommerceAPI.svc/jsonp/CatalogItemGet?apiKey=519BAAC8E607413CA1FC043C92D08AAD&sessionId=A0F866D6907D411395E5CEDB6C359357&itemId=9045049&lookupType=ItemNumber";
  	var req = httpRequest.makeGetRequest(url,null,function(err,data){
  		//get only the First Item of the aarray
  		data = data.d.Items[0];

  		//pass the raw data througn a filter to flatten the data
  		data = productModel.getFlatResponse(data);
  		
  		if(!err){

        var titleData ={
          title: data.title,
          artist: data.artist,
          productType:data.productType,
          ProductPageUrl:data.ProductPageUrl,
          sku:data.sku
        }
        var herodata = data.images;
        var today = new Date();
        var tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
        ];

        var bottomBarData ={
          price:"$"+data.prices.price,
          arrivesBy: monthNames[tomorrow.getMonth()]+ tomorrow.getDate()
        };
      /*
      renderthe react components
       */
      var markup = React.renderComponentToString(
        productPageComponent({Title: titleData,Hero:herodata,BottomBar: bottomBarData})
      );

			res.render('product', {
        htmlTag: metaTags[0].Value,
        markup:markup,
				json: JSON.stringify(data,undefined,2)
			});
  		}
  		
  	});
  	 
  });

  module.exports = router;