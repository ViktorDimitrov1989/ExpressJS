/*jshint esversion: 6 */
const gulp = require('gulp');
const minifyCss = require('gulp-cssmin');
const rename = require('gulp-rename');
let cleanCSS = require('gulp-clean-css');

gulp.task('minify-css', function () {
	gulp.src('content/styles/*.css')
		.pipe(minifyCss())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist'));
});
