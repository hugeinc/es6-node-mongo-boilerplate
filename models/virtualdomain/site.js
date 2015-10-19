var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var urlify = require( 'urlify' ).create({
    spaces: '-',
    toLower: true,
    nonPritable: '-',
    trim: true
});

/**
 * Site model Schema
 * @type {Schema}
 */
var SiteSchema = new Schema({
    //add items here
});

//turn off autoindexing. helps with performance in production
SiteSchema.set( 'autoIndex', false );

//allow getters to be run on all documents when converting to Objects & JSON
SiteSchema.set( 'toObject', { getters: true, virtuals: false } );
SiteSchema.set( 'toJSON', { getters: true, virtuals: false } );

//model instance methods
SiteSchema.methods = {

};

//model static methods
SiteSchema.statics = {

};

module.exports = function( connection ){
    return connection.model( 'Site', SiteSchema );
};
