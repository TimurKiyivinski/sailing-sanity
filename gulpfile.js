var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var shell = require('gulp-shell')
var del = require('del');
var forever = require('gulp-forever-monitor');

var paths = {
    'acss': './assets/styles/',
    'ajs': './assets/js/',
    'css': './.tmp/public/styles/',
    'js': './.tmp/public/js/',
    'fonts': './.tmp/public/fonts/',
    'jquery': './node_modules/jquery/',
    'bootstrap': './node_modules/bootstrap-sass/assets/'
}

gulp.task('clean', function() {
    return del([
        paths.fonts + '**/*',
        paths.css + 'app.css',
        paths.js + 'app.js'
    ]);
});

gulp.task('copy', function () {
    gulp.src([paths.bootstrap + 'fonts/**']).pipe(gulp.dest(paths.fonts));
});

gulp.task('sass', function () {
    gulp.src(paths.acss + 'app.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(minify())
      .pipe(gulp.dest(paths.css));
});

gulp.task('scripts', function() {
    gulp.src([
        paths.jquery + "dist/jquery.js",
        paths.bootstrap + "javascripts/bootstrap.js",
        paths.ajs + "home.js",
    ]).pipe(concat('app.js'))
      .pipe(uglify())
      .on('error', function() { console.log('Caught a JS error.'); })
      .pipe(gulp.dest(paths.js));
});

gulp.task('watch', function () {
    gulp.watch(paths.acss + 'app.scss', ['sass']);
    gulp.watch(paths.ajs + 'home.js', ['scripts']);
});

gulp.task('lift', function() {
    var options = { 
        env: process.env,
        args: process.argv,
        watch: true,
        watchIgnorePatterns:  ['.*', 'node_modules/**', '**/.tmp/**', '**/views/**']
    };

    forever('app.js', options)  
    .on('watch:restart', function(fileInfo) { 
        console.log('Restarting server');          
    })
    .on('exit', function() {
        console.log('Closing server');
    });
});

gulp.task('default', ['clean', 'copy', 'sass', 'scripts']);

gulp.task('develop', ['clean', 'copy', 'sass', 'scripts', 'watch', 'lift']);

