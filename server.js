var express = require('express')
	,app 	= express()
	,bunyan = require('bunyan')
	,_ = require('underscore')
	,util 	= require('util')
	,os 	= require('os')
	,childProcess = require('child_process');


var log = bunyan.createLogger({
	name: "React 101",
	serializers: bunyan.stdSerializers,
	streams: [//stream opitons: all,debug,info,warn,error,off
		// {
		// 	stream: process.stdout,
		// 	level: 'info'
		// },
		{
			path: 'server.log',
			level: 'debug',
      period: '4h',   // daily rotation
      count: 3        // keep 3 back copies
		}
	],
});
var eventLog = log.child({logType: 'event'});
var requestLog = log.child({logType: 'request'});


function logger(req, res, next) {
	//log.info(req.headers);
	if(req.body.remoteLog){
		// eventLog.info(req.body.log)
		eventLog.info({req:req},req.body.remoteLog)
		//console.log(new Date(),(_.isString(req.body.log))?req.body.log:JSON.stringify(req.body.log))
		console.log(new Date(),JSON.stringify(req.body.remoteLog))
	}else{
		requestLog.info({req:req});
		console.log(new Date(),req.url)
	}
	// console.log('REQ: '+req.originalUrl);
	// if(req.body.log)console.log('POST: '+JSON.stringify(req.body))
	// if(/proxy/i.test(req.originalUrl))console.log('PROXY: '+req.originalUrl)
	// if(req.body.log)console.log('LOG: '+req.body.log)
	next(); // Passing the request to the next handler in the stack.
}




var serverPathArg = process.argv[2]||__dirname; //gets 3rd argument from command line or uses current location

var rootDir = serverPathArg;

var port 	= 3000;


app.use(express.json());
app.use(express.urlencoded());

app.use(logger);

app.use(express.static(rootDir));

app.use('/log/',function(req,res){res.send('ok')})

app.listen(port);


//===================
var addresses = getAddresses();
console.log()
console.log('* Make sure Chrome is closed before you run this, if you want the CORS policy disabled. *')
console.log('Current Directory: '+__dirname)
console.log('Serving files from: '+rootDir)
console.log('Listening on: ' + addresses + ':' + port + '');
console.log('Press Ctrl + C to stop.');

//open in Chrome w/CORS disabled
var address = addresses[0]+':'+port;
// childProcess.exec('osascript -e \'quit app "Chrome"\'');
childProcess.exec('/usr/bin/open -a "/Applications/Google Chrome.app" --args --disable-web-security '+address);
// childProcess.exec('open http://jira.art.com:8080/secure/Dashboard.jspa');


//=====================
function getAddresses(){
	var interfaces = os.networkInterfaces(),
		addresses = [];
	
	_.each(interfaces,function(net){
		_.each(net,function(address){
			if (address.family == 'IPv4' && !address.internal) addresses.push(address.address);
		})
	})

	return addresses;
}



// 
// sudo dtrace -x strsize=4k -qn 'bunyan*:::log-*/strstr(this->str = copyinstr(arg0), "\"logType\":\"event\"") != NULL/{printf("%s", this->str)}'




