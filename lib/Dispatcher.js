var ejs = require('ejs'),
	read = require('fs').readFileSync;


module.exports = {
	dispatch: function( req, res ){
		//try{
			var file = read( './views/partials/'+req.page+'/'+req.section+'.ejs', 'utf8' );
			res.set('Content-Type', 'text/html');
			//res.send(new Buffer(file));
			res.send( ejs.render( file, {} ) );
		// }catch( e ){
		// 	res.set('Content-Type', 'text/html');
		// 	res.status(400).send('bad request');
		// }
	}
};
