var gulp = require('gulp'),
  compass = require('gulp-compass'),
  notify = require("gulp-notify"),
  templateCache = require('gulp-angular-templatecache'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  cachebreaker = require('gulp-cache-breaker'),
  plumber = require('gulp-plumber'),
  clean = require('gulp-clean');

var title = '<nombreModuloApp>';

gulp.task('compass', ['clean-styles'], function () {
  gulp.src('sass/**/*.scss')
    .pipe(plumber({errorHandler: notify.onError({message: 'Commpass compile error', title: title})}))
    .pipe(compass({
      config_file: './config.rb'
    }))
    .pipe(notify('Finished compass!!'));
});

gulp.task('css_lib', function () {
  return gulp.src([
    'node_modules/angularjs-datepicker/dist/angular-datepicker.min.css',
    'node_modules/easy-autocomplete/dist/easy-autocomplete.min.css',
  ])
    .pipe(plumber({errorHandler: notify.onError({message: 'CSS concat error', title: title})}))
    .pipe(concat('lib.css'))
    .pipe(gulp.dest('css'));
});

gulp.task('template-cache', function () {
  return gulp.src('views/**/*.html')
    .pipe(templateCache({
      module: 'iberia-interno-app',
      root: 'views/'
    }))
    .pipe(gulp.dest('js'));
});

gulp.task('minify', ['template-cache'], function () {
  return gulp.src([
    'js/**/*.js',
    '!js/constant/config.js'
  ])
    .pipe(plumber({errorHandler: notify.onError({message: 'JS minify error', title: title})}))
    .pipe(concat('script.min.js'))
    //.pipe(uglify({mangle:false}))
    .pipe(gulp.dest('dist'))
    .pipe(notify('Finished minification!!'));
});

gulp.task('minify_lib', function () {
  return gulp.src([
    'node_modules/angular/angular.js',
    'node_modules/angular-cookies/angular-cookies.js',
    'node_modules/angular-socialshare/dist/angular-socialshare.js',
    'node_modules/angularjs-datepicker/dist/angular-datepicker.min.js',
    'node_modules/angular-i18n/angular-locale_es-es.js',
    'node_modules/easy-autocomplete/dist/jquery.easy-autocomplete.min.js',
    'node_modules/angular-animate/angular-animate.js',
    'lib/*.js'
  ])
    .pipe(plumber({errorHandler: notify.onError({message: 'JS minify error', title: title})}))
    .pipe(concat('lib.min.js'))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean-styles', function () {
  return gulp.src('css/style.css')
    .pipe(clean());
});

gulp.task('clean-scripts', function () {
  return gulp.src([
    'dist/script.min.js',
    'dist/lib.min.js'
  ])
    .pipe(clean());
});

gulp.task('clean-and-build-scripts', ['clean-scripts', 'minify', 'minify_lib'], function () {
});

gulp.task('build', ['compass', 'css_lib', 'template-cache', 'minify', 'minify_lib'], function () {
});

gulp.task('default', ['compass', 'css_lib', 'template-cache', 'minify', 'minify_lib'], function () {
});

gulp.task('quick', ['template-cache', 'minify'], function () {
});

gulp.task('watch', function () {
  gulp.watch('sass/**/*.scss', ['compass']);
  gulp.watch('js/**/*.js', ['minify']);
  gulp.watch('views/**/*.html', ['template-cache']);
});
