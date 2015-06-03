var React = require('react'),
  express = require('express'),
  router = express.Router()
  httpRequest = require('../Utils/HttpRequestModule'),
  log=  require('../Utils/logger'),
  productModel = require('../Models/productModel');
  /*
  	router configuration after /Product/*
   */
  
  router.get("/", function(req,res){
  	log.info("--------------arrived here---------")
  	var url ="http://api.art.com/EcommerceAPI.svc/jsonp/CatalogItemGet?apiKey=519BAAC8E607413CA1FC043C92D08AAD&sessionId=A0F866D6907D411395E5CEDB6C359357&itemId=9045049&lookupType=ItemNumber";
  	var req = httpRequest.makeGetRequest(url,null,function(err,data){
  		//get only the First Item of the aarray
  		data = data.d.Items[0];

  		//pass the raw data througn a filter to flatten the data
  		data = productModel.getFlatResponse(data);
  		
  		if(!err){
			res.render('product', {
				markup: JSON.stringify(data,undefined,2)
			});
  		}
  		
  	});
  	 
  });

  module.exports = router;