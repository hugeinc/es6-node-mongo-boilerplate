var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    minifyCSS = require('gulp-minify-css'),
    browserify = require('gulp-browserify2'),
    babelify = require('babelify'),
    jshint = require('gulp-jshint'),
    util = require('gulp-util'),
    buffer = require('vinyl-buffer'),
    source = require('vinyl-source-stream'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    webpack = require('webpack');

//PRODUCTION TASKS

gulp.task('transpile-minify', function() {
	gulp.src('./js/app.es6.js')
	.pipe(browserify({
        fileName: 'app.js',
        transform: {
            tr: babelify,
            options: {
                loose: ['es6.modules']
            }
        },
        options: {
            debug: true
        }
    }))
	.pipe(buffer())
	.pipe(sourcemaps.init({ loadMaps: true }))
	.pipe(uglify({ mangle: false }))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('./public/Includes/scripts'));
});

gulp.task('sass-minify', function() {
	gulp.src('./sass/**/*.scss')
		.pipe(sass())
		.pipe(minifyCSS())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('./public/Includes/css'));
})

gulp.task('production', [
	'transpile-minify',
	'sass-minify'
]);

//DEVELOPMENT TASKS

//WEBPACK

var webpackInit = function(input, output) {
    var webpackConfig = require('./webpack.config.js')(input, output);
    var webpackConfigDev = Object.create(webpackConfig);
    webpackConfigDev.devtool = 'sourcemap';
    webpackConfigDev.debug = true;

    return webpack(webpackConfigDev);
};

var webpackRun = function(cmplr, callback, subdir) {
    cmplr.run(function(err, stats) {
        if(err) throw new gutil.PluginError('webpack:build-dev', err);
        gutil.log('[webpack-build-dev-'+subdir+']', stats.toString({
            colors: true
        }));
        callback();
    });
};

var lintTask = function(input) {
    return function() {
        gulp.src(input)
            .pipe(jshint({
            	esnext: true,
    			expr: true,
                jquery: true
                }))
            .pipe(jshint.reporter('default'));
    }
};

var sassTask = function(input, output) {
    return function() {
        gulp.src(input)
    		.pipe(sass({
    			style: 'expanded',
    			sourceComments: 'normal'
    		}))
    		.pipe(gulp.dest(output));
    }
};

var dynamicTasks = function(subdir) {
    //javascript compile task
    var devCompiler = webpackInit('./js/'+subdir+'/app.es6.js', './public/'+subdir+'/Includes/scripts');
    gulp.task('webpack-build-dev-'+subdir, function(callback) {
        webpackRun(devCompiler, callback, subdir);
    });
    //javascript lint task
    gulp.task('lint-'+subdir, lintTask('./js/'+subdir+'/**/*.es6.js'));
    //watch tasks just created
    gulp.watch(['./js/'+subdir+'/**/*.es6.js'], ['lint-'+subdir, 'webpack-build-dev-'+subdir]);

    //css
    //new task for compiling sass
    gulp.task('sass-'+subdir, sassTask('./sass/'+subdir+'/**/*.scss', './public/'+subdir+'/Includes/css'));
    //watch task just created
    gulp.watch(['./sass/'+subdir+'/**/*.scss'], ['sass-'+subdir]);

    //run tasks just composed
    gulp.start('sass-'+subdir, 'webpack-build-dev-'+subdir);
};

gulp.task('webpack-watch', function() {
    //tasks for virtual hosts
    dynamicTasks('virtualdomain');
    //tasks for root
    dynamicTasks('root');
});

gulp.task('default', ['webpack-watch']);
