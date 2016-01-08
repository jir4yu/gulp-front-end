var gulp = require('gulp'),
	sass = require('gulp-sass'),
	minifyCss = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin');

var paths = {
	images: './img/*', //change your images path here.
	sass: './scss/**/*.scss', //change your scss path here.
	js: './js/**/*.js' //change your js path here.
}

gulp.task('imagemin', function() {
	return gulp.src(paths.images)
		.pipe(imagemin())
		.pipe(gulp.dest('./dist/img/'));
});

gulp.task('scss', function() {
	return gulp.src(paths.sass)
		.pipe(sass().on('error', sass.logError))
		.pipe(minifyCss({
			keepSpecialComments: 0
		}))
		.pipe(gulp.dest('./dist/css/'))
});

gulp.task('js', function() {
	return gulp.src(paths.js)
		.pipe(concat('bundle.js', {
			newLine: ';'
		}))
		.pipe(uglify({
			preserveComments: 'license'
		}))
		.pipe(rename('bundle.min.js'))
		.pipe(gulp.dest('./dist/js/'));
});

gulp.task('watch', function() {
	gulp.watch(paths.images, ['imagemin']);
	gulp.watch(paths.sass, ['scss']);
	gulp.watch(paths.js, ['js']);
});

gulp.task('default', ['watch', 'imagemin', 'scss', 'js']);