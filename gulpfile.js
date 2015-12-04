var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss');

gulp.task('js', function () {
  return browserify({entries: './src/js/bundles/app.js', extensions: ['.jsx','.js'], debug: true})
    .transform('babelify', {presets: ['es2015', 'react']})
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('public'));
});

gulp.task('css',function(){
  gulp.src('./src/css/app.sass')
    .pipe(sass({ sourceComments: 'normal', indentedSyntax: true }))
    .pipe(gulp.dest('public'));
});



gulp.task('default', ['js','css']);