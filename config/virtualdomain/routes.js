module.exports = function(app, conn, name) {
    //controllers

    var controller = __dirname+'/../../controllers/'+name+'/site';
    var site = require( controller )( name, conn );

    //routes

    app.get( '/', site.default );
    //app.get( '/pagename', site.pagename );
};
