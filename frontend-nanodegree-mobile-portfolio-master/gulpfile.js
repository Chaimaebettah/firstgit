var gulp        = require('gulp');
var image       = require('gulp-image');
var imageResize = require('gulp-image-resize');
var uglify      = require('gulp-uglify');
var minify      = require('gulp-cssmin');
var rename      = require('gulp-rename');
var styleInject = require("gulp-style-inject");



gulp.task('images', function(){
    gulp.src(['!./src/img/pizzeria.jpg', './src/img/*.jpg', './src/img/*.png'])
        .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            advpng: true,
            jpegRecompress: false,
            jpegoptim: true,
            mozjpeg: true,
            gifsicle: true,
            svgo: true
        }))
        .pipe(gulp.dest('./dist/img/'));

});

gulp.task('images-resize', function(){
    gulp.src(['./src/img/pizzeria.jpg'])
        .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            advpng: true,
            jpegRecompress: false,
            jpegoptim: true,
            mozjpeg: true,
            gifsicle: true,
            svgo: true
        }))
        .pipe(imageResize({
            width: 120
        }))
        .pipe(gulp.dest('./dist/img/'))
});



gulp.task('css', function(){
    gulp.src('./src/css/*.css')
        .pipe(minify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/css/'))
});

gulp.task('js', function(){
    gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'))
});

gulp.task('html', function(){
    gulp.src(['./index.html', './src/**/*.html'])
        .pipe(styleInject())
        .pipe(gulp.dest('./dist/'));

});



gulp.task('default', ['images', 'images-resize','css', 'html', 'js']);