/** REQUIREMENTS */
var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');

// environment & config
var env = process.env.NODE_ENV || 'dev';
var config = require(__dirname + '/config/app')[env];


/** MONGO */
// connect to mongodb
var maxRetries = 5,
    retries = 0,
    mongoEnabled = false;
var connect = function () {
  console.log('connecting');
  var options = {
    server: {
      socketOptions: { keepAlive: 1 }
    }
  };
  mongoose.connect(config.db, options);
};
if(mongoEnabled){
    connect();
}

// Error handler
mongoose.connection.on('error', function (err) {
  console.log('Mongo Error: ' + err);
});

// Reconnect when closed
mongoose.connection.on('disconnected', function () {
  if(retries < maxRetries){
      connect();
      retries++;
  }
});


/** Express */
// create server
var server = app = express();

// configure server
server.use(express.bodyParser());
server.use(express.compress());
server.use('/public', express.static(__dirname + '/public'));

// load models
var models_path = __dirname + '/models'
fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) require(models_path + '/' + file);
});

//set views, view engine
server.set( 'views', __dirname + '/views' );
server.set( 'view engine', 'ejs' );

// apply routes
require( __dirname + '/config/routes')(server);

// listen to the supplied port
server.listen(config.ports.server, function() {
  console.log('listening to port ' + config.ports.server);
});
