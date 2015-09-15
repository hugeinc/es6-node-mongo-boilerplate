var mongoose = require( 'mongoose' );
var Race = mongoose.model( 'Site' );
var Response = require( __dirname + '/../lib/Response' );
var Dispatcher = require( __dirname + '/../lib/Dispatcher' );

module.exports = {
    default: function( req, res ){
        res.render( 'index', { data: { page: 'default' } } );
    },
    pagename: function( req, res ){
        res.render( 'index', { data: { page: 'pagename' } } );
    }
};
