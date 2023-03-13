var gulp = require('gulp'), 
    sass = require('gulp-sass')(require('sass')),
    cssnano = require('gulp-cssnano'), 
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'), 
    pngquant = require('imagemin-pngquant');

    gulp.task('sass', function(){ 
        return gulp.src('scss/style.scss') 
            .pipe(sass()) 
            .pipe(gulp.dest('css')) 
    });

    gulp.task('css-min', function() {
        return gulp.src('scss/style.scss') 
            .pipe(sass()) 
            .pipe(cssnano()) 
            .pipe(rename({suffix: '.min'})) 
            .pipe(gulp.dest('build/css'));
    });

    gulp.task('img', function() {
        return gulp.src('img/**/*')
            .pipe(imagemin({
                interlaced: true,
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [pngquant()]
            }))
            .pipe(gulp.dest('build/img')); 
    });


    gulp.task('watch', function() {
        gulp.watch('scss/**/*.scss', gulp.parallel('sass'));
    });

    gulp.task('default', gulp.parallel('img', 'css-min', 'sass', 'watch'))