var gulp = require('gulp'),
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
    rename = require('gulp-rename');

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

gulp.task('lint', function () {
    gulp.src('./js/*.es6.js')
        .pipe(jshint({
        	esnext: true,
			expr: true,
            jquery: true
            }))
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('transpile', function() {
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
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('./public/Includes/scripts'));
});

gulp.task('sass', function() {
	gulp.src('./sass/**/*.scss')
		.pipe(sass({
			style: 'expanded',
			sourceComments: 'normal'
		}))
		.pipe(gulp.dest('./public/Includes/css'))
});

gulp.task('watch', function() {
	gulp.watch(['./js/**/*.es6.js'], ['lint','transpile']);
	gulp.watch(['./sass/**/*.scss'], ['sass']);
});

gulp.task('default', ['transpile', 'sass', 'watch']);
