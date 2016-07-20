/**
 * Created by cloudoc on 2016/7/19.
 */
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

//start server
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: './app'
    });
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html').on('change', browserSync.reload);
});

//compile sass to css
gulp.task('sass', function(){
    return sass('app/scss/**/*.scss', {sourcemap:true})
        .on('error', function(err) {
            console.error('Error!', err.message);
        })
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css'))
        .pipe(reload({stream:true}));
});

//default
gulp.task('default', ['serve']);

