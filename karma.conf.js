// Karma configuration
// Generated on Tue May 12 2015 17:26:26 GMT-0400 (Eastern Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
  	// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
  	// fixture docs: http://karma-runner.github.io/0.8/config/files.html
    frameworks: ['jasmine-jquery', 'browserify', 'jasmine', 'fixture'],


  	// list of files / patterns to load in the browser
  	// http://karma-runner.github.io/0.8/config/files.html
    files: [
	  {
		pattern: 'spec/fixtures/*.html'
	  },
      {
        pattern: 'spec/fixtures/css/*.css', //this css will be loaded for every test
      },
	  'js/**/*.es6.js',
      'spec/*.js',
      // 'public/includes/css/styles.css'
    ],


    // list of files to exclude
    exclude: [
		'js/app.es6.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    	'spec/fixtures/*.html': ['html2js'],
		//'spec/fixtures/*.json': ['json_fixtures'],
    	'js/**/*.es6.js': ['browserify'],
    	'spec/*.js': ['browserify']
    },

	//variable name for JSON files. window.__json__
    jsonFixturesPreprocessor: {
		variableName: '__json__'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome_large','Chrome_medium','Chrome_small'],

    customLaunchers: {
        Chrome_large: {
            base: 'Chrome',
            flags: ['--window-size=1280,300']
        },
        Chrome_medium: {
            base: 'Chrome',
            flags: ['--window-size=800,300']
        },
        Chrome_small: {
            base: 'Chrome',
            flags: ['--window-size=320,300']
        },
    },


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    browserify: {
        debug: true,
        transform: ['babelify']
    }
  });
};
