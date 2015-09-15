var util = require('util');

module.exports = {
  code : function(err, data) {
    return (!!err) ? 500 : (!data) ? 400 : 200;
  },

  data : function(err, data) {
    return {
      data: (util.isArray(data)) ? data : (typeof data !== 'undefined' && data !== null) ? [data] : [],
      error: err || ''
    };
  }
}
