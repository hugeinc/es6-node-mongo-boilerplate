/** REQUIREMENTS */
var fs = require('fs');
var mongoose = require('mongoose');
var evh = require('express-vhost');
var express = require('express');

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

// vhosts

var createServer = function(name, models, views, routes) {
    var svr = express();

    //configure server
    svr.use(express.bodyParser());
    svr.use(express.compress());
    svr.use('/public', express.static(__dirname + '/public/'+name));

    //load models
    var models_path = __dirname + '/models/'+models;
    fs.readdirSync(models_path).forEach(function(file) {
        if(~file.indexOf('.js')) require(models_path + '/' + file);
    });

    //set views, view engine
    svr.set('views', __dirname+'/views/'+views);
    svr.set('view engine', 'ejs');

    //apply routes
    require( __dirname + '/config/'+routes+'/routes')(svr);

    return svr;
};


// create main server
var server = app = express();
server.use(evh.vhost(app.enabled('trust proxy')));

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

//create and register virtual hosts
/**
    the createServer method takes 4 directory names as input params.
    make sure you have these directories (and files) in your file system.

    name = public files dir (/public/[project name]/[your files here])
    models = models dir (/models/[models name]/[your files here])
    views = views dir (/views/[views name]/[your files here])
    routes = routes dir (/config/[routes name]/routes.js)*

    this can allow easy sharing of logic between applications if necessary.

    * controllers are imported into routes.js files

    to enable vhosts un-comment the lines below and configure to
    your needs.

    front-end configuration to be added next.
**/

var vhosts = {
    dev: {
        virtualdomain: 'virtualdomain.local',
        virtualdomainalt: 'virtualdomainalt.local'
    },
    prod: {
        virtualdomain: 'virtualdomain.com',
        virtualdomainalt: 'virtualdomainalt.com'
    }
};

// var vdomain = createServer('virtualdomain', 'virtualdomain', 'virtualdomain', 'virtualdomain');
// var vdomainalt = createServer('virtualdomain', 'virtualdomain', 'virtualdomain', 'virtualdomainalt'); //same logic as vdomain, but different routes
//
// evh.register(vhosts[env].virtualdomain, vdomain);
// evh.register(vhosts[env].virtualdomainalt, vdomainalt);
