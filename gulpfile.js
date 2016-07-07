var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var image = require('gulp-image');


gulp.task('clean', function(clean_files) {
   return del(['dist/**'], clean_files);
});

gulp.task('copy-files', function() {

    gulp.src('*.html')
            .pipe(gulp.dest('dist/'));

    gulp.src('css/**')
        .pipe(gulp.dest('dist/css'));

    gulp.src('img/**')
                .pipe(image({
                    pngquant: true,
                    optipng: true,
                    zopflipng: false,
                    advpng: false,
                    jpegRecompress: false,
                    jpegoptim: true,
                    mozjpeg: false,
                    gifsicle: false,
                    svgo: false
                }))
                .pipe(gulp.dest('dist/img'));

    gulp.src('js/**')
        .pipe(gulp.dest('dist/js'));

    gulp.src('views/css/**')
            .pipe(gulp.dest('dist/views/css'));

    gulp.src('views/images/*.png')
            .pipe(image({pngquant: true}))
            .pipe(gulp.dest('dist/views/images'));


    gulp.src('views/images/**')
                .pipe(image({
                                pngquant: true,
                                optipng: true,
                                zopflipng: false,
                                advpng: false,
                                jpegRecompress: false,
                                jpegoptim: true,
                                mozjpeg: false,
                                gifsicle: false,
                                svgo: false
                            }))
                .pipe(gulp.dest('dist/views/images'));

    gulp.src('views/js/**')
            .pipe(gulp.dest('dist/views/js'));

    return gulp.src('views/*.html')
            .pipe(gulp.dest('dist/views/'));
});

gulp.task('default', function() {
    runSequence('clean', 'copy-files');
});