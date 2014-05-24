var gulp = require('gulp');
var insert = require('gulp-insert');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var plumber = require('gulp-plumber');

var fs = require('fs');

var paths = {
  coffee: ['src/**/*.coffee'],
  static: ['src/**/*.json'],
};

gulp.task('coffee', function () {
  return gulp.src(paths.coffee)
    .pipe(plumber())
    .pipe(coffee({bare: true})).on('error', function (err) {
      fs.writeFileSync(err.options.generatedFile, "throw new Error('There was an error compiling your CoffeeScript. Details: ' + " + JSON.stringify(err.message) + ");");
    })
    .on('error', gutil.log)
    .pipe(insert.prepend('/* @' + 'generated */'))
    .pipe(gulp.dest('lib/'))
    ;
});

gulp.task('copy', function () {
  return gulp.src(paths.static)
    .pipe(gulp.dest('lib/'))
    ;
});

gulp.task('watch', function () {
  gulp.watch(paths.coffee, ['coffee']);
  gulp.watch([paths.static], ['copy']);
});

gulp.task('default', ['coffee', 'copy', 'watch']);

