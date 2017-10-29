'use strict'

var autoprefixer = require('autoprefixer');
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var imagemin = require('gulp-imagemin');
var clean = require('gulp-clean');

gulp.task('compile', function () {
    var plugins = [
        autoprefixer({ browsers: ['last 4 versions'] })
    ];

    return gulp.src('./src/scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./static/css/'))
});

gulp.task('watch', function() {
    gulp.watch(['./src/scss/**/*.scss'], ['compile']);
});

gulp.task('imagemin', function() {
    gulp.src('./static/images/**/*')
      .pipe(imagemin({
        verbose: true
      }))
      .pipe(gulp.dest('./static/images'))
  });