module.exports = function(input, output) {
	var values = {};
	values.entry = input;
	values.output = {};
	values.output.path = output;
	values.output.filename = 'app.js';
	values.module = {
        loaders: [ {
                test   : /.js$/,
				exclude : /(node_modules|bower_components|neat|bourbon)/,
                loader : 'babel-loader'
            }
        ]
    };
	return values;
};
