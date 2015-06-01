var mongoose = require('mongoose');

// Create a new schema for our tweet data
var tweetSchema = new mongoose.Schema({
    twid       : String
  , active     : Boolean
  , author     : String
  , avatar     : String
  , body       : String
  , date       : Date
  , screenname : String
});

tweetSchema.statics.findTweets = function(page,skip,callback){

	var start = 9*page + skip,
		tweets =[];
	Tweet.find({},'twid active author avatar body date screenname',{skip:start,limit:10}).sort({date:'desc'}).exec(function(err,data){
		if(!err){
			tweets= data;
			tweets.forEach(function(tweet) {
				tweet.active = true; // Set them to active
			});
		}

		callback(tweets);
	});
};


module.exports= Tweet = mongoose.model('Tweet',tweetSchema);