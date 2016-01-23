// var gulp = require('gulp');
// var browserify = require('browserify');
// var babelify = require('babelify');
// var source = require('vinyl-source-stream');
// var sass = require('gulp-sass');
// var uglifycss = require('gulp-uglifycss');

// gulp.task('js', function () {
//   return browserify({entries: './src/js/bundles/app.js', extensions: ['.jsx','.js'], debug: true})
//     .transform('babelify', {presets: ['es2015', 'react']})
//     .bundle()
//     .pipe(source('app.js'))
//     .pipe(gulp.dest('public'));
// });

// gulp.task('css',function(){
//   gulp.src('./src/css/app.sass')
//     .pipe(sass({ sourceComments: 'normal', indentedSyntax: true }))
//     .pipe(gulp.dest('public'));
// });

// gulp.task('default', ['js','css']);

'use strict';

var gulp = require('gulp');
var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss');
var uglify = require('gulp-uglify');

var bundlejs = function(bfy) {
  return bfy.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./public'));
};

var customOpts = {
  entries: ['./src/js/bundles/app.js'],
  debug: true,
  extensions: ['.js']
};
var opts = Object.assign({}, watchify.args, customOpts);
var b = browserify(opts).transform('babelify', {presets: ['es2015', 'react']})
var w = watchify(browserify(opts).transform('babelify', {presets: ['es2015', 'react']})); 

w.on('update', function(){  bundlejs(w); });
w.on('log', gutil.log); // output build logs to terminal

gulp.task('js',function(){ return bundlejs(b) }); 

gulp.task('css',function(){
  return gulp.src('src/css/app.sass')
    .pipe(sass({ sourceComments: 'normal', indentedSyntax: true }))
    .pipe(gulp.dest('public'));
});

gulp.task('watch',function(){
  bundlejs(w)
  gulp.watch('./src/css/**/*',['css'])
});

gulp.task('default',['js','css']);

gulp.task('productionify',['default'],function(){
  gulp.src('public/app.js')
    .pipe(uglify())
    .pipe(gulp.dest('public'));

  gulp.src('public/app.css')
    .pipe(uglifycss())
    .pipe(gulp.dest('public'));
});
