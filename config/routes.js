
// controllers

var site = require( __dirname + '/../controllers/site' );

//routes

module.exports = function(app) {
  app.get( '/', site.default );
  //app.get( '/pagename', site.pagename );
};
