var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var image = require('gulp-image');
var imageResize = require('gulp-image-resize');
var htmlmin = require('gulp-htmlmin');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");


var image_compress_options = {
                    pngquant: true,
                    optipng: true,
                    zopflipng: false,
                    advpng: false,
                    jpegRecompress: false,
                    jpegoptim: true,
                    mozjpeg: false,
                    gifsicle: false,
                    svgo: false
                };

gulp.task('clean', function(clean_files) {
   return del(['dist/**'], clean_files);
});

gulp.task('copy-files', function() {

    gulp.src('*.html')
            .pipe(htmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest('dist/'));

    gulp.src('css/**')
        .pipe(cleanCSS({debug: true}, function(details) {
                    console.log(details.name + ': ' + details.stats.originalSize);
                    console.log(details.name + ': ' + details.stats.minifiedSize);
                }))
        .pipe(gulp.dest('dist/css'));

    gulp.src('img/**')
                .pipe(image(image_compress_options))
                .pipe(gulp.dest('dist/img'));

    gulp.src('js/**')
        .pipe(gulp.dest('dist/js'));

    gulp.src('views/css/**')
            .pipe(gulp.dest('dist/views/css'));

    gulp.src('views/images/*.png')
            .pipe(image({pngquant: true}))
            .pipe(gulp.dest('dist/views/images'));


    gulp.src('views/images/pizza.png')
                .pipe(image(image_compress_options))
                .pipe(gulp.dest('dist/views/images'));

    gulp.src('views/images/pizzeria.jpg')
                .pipe(imageResize({
                    width: 720,
                    height: 540
                }))
                .pipe(image(image_compress_options))
                .pipe(gulp.dest('dist/views/images'));

    gulp.src('views/images/pizzeria.jpg')
                .pipe(imageResize({
                    width: 100,
                    height: 75
                }))
                .pipe(image(image_compress_options))
                .pipe(rename("pizzeria-thumb.jpg"))
                .pipe(gulp.dest('dist/views/images'));

    gulp.src('views/js/**')
            .pipe(gulp.dest('dist/views/js'));

    return gulp.src('views/*.html')
            .pipe(gulp.dest('dist/views/'));
});

gulp.task('default', function() {
    runSequence('clean', 'copy-files');
});