var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var webpack = require('gulp-webpack');
var del = require('del');

// File paths
var DIST_PATH = 'public/dist/';
var SCRIPTS_PATH = 'public/scripts/**/*.js';
var CSS_PATH = 'public/css/**/*.css';
var TEMPLATES_PATH = 'templates/**/*.hbs';
var IMAGES_PATH = 'public/images/**/*.{png,jpeg,jpg,gif,svg}';

// Clean dist folder
gulp.task('clean', function () {
	return del.sync([
		DIST_PATH
	]);
});

// SCSS task
gulp.task('styles', function () {
	console.log('starting styles task');
	return gulp.src('app/styles/app.scss')
		.pipe(plumber(function (err) {
			console.log('Styles task error');
			console.log(err);
			this.emit('end');
		}))
		.pipe(sourcemaps.init())
		.pipe(autoprefixer())
		.pipe(sass({
			// outputStyle: 'compressed'
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('public/dist'))
		.pipe(livereload())
});

// Webpack task
gulp.task('webpack', function () {
	console.log('starting webpack task');
	return gulp.src('/')
		.pipe(plumber(function (err) {
			console.log('webpack task error');
			console.log(err);
			this.emit('end');
		}))
		.pipe(webpack(require('./webpack.config.js')))
		.pipe(gulp.dest('public/dist'))
		.pipe(livereload())
});

// Default Task
gulp.task('default', ['clean', 'styles', 'webpack'], function () {
	console.log('Starting default task');
	return gulp.src('/')
		.pipe(gulp.dest('public/dist'))
		.pipe(livereload());
});

gulp.task('watch', ['default'], function () {
	console.log('Starting watch task');
	require('./server.js');
	livereload.listen();
	gulp.watch('app/styles/**/*.scss', ['styles']);
	gulp.watch('app/**/*.jsx', ['webpack']);
});