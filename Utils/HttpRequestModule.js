var http = require('http');


module.exports = {
	makeGetRequest : function(url,params,callback){
		  var request = http.get(url, function (response) {
            // data is streamed in chunks from the server
            // so we have to handle the "data" event    
            var buffer = "", 
                data;

            response.on("data", function (chunk) {
            	buffer += chunk;
            }); 

			response.on("end", function(err) {

				if(err){
					callback(err,null);
				}
				else
				{
					data = JSON.parse(buffer);	
					callback(null,data);
				}
				
			});
		});
	},
	makePostRequest: function(url,params,callback){

	}

}