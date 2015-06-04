var httpRequest = require('./HttpRequestModule');

var metaTags = [];
module.exports ={
	getMetaTags :function(url,callback) {
		httpRequest.makeGetRequest(url, null, function(err, data) {
			if (!err) {
				metaTags = data.d.metaTags;
			}
			
			callback(err,metaTags);

		});
	}
}