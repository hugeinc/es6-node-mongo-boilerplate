var Response = require( __dirname + '/../lib/Response' );

module.exports = function( name, conn ){

    var model = __dirname+'/../../models/'+name+'/site';
    var Site = require( model )( conn );

    return {
        default: function( req, res ){
            res.render( 'index', { data: { page: 'default' } } );
        },
        pagename: function( req, res ){
            res.render( 'index', { data: { page: 'pagename' } } );
            //Site.find( function( err, data ){
            //  res.json( Response.code( err, data ), Response.data( err, data ) );
            //});
        }
    };
};
