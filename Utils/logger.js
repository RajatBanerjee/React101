 var bunyan =require('bunyan');
  
  PrettyStream = require('bunyan-prettystream');
  
var prettyStdOut = new PrettyStream();
prettyStdOut.pipe(process.stdout);
var log = new bunyan({
  name: 'React101',
  streams: [
    {
      stream: prettyStdOut,
      level: 'info'
    },
    {
      path: 'React101.log',
      level: 'trace'
    }
  ]
});

module.exports = log