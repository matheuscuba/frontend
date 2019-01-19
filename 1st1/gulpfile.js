var gulp = require('gulp'),
    less = require('gulp-less'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename');

const configs = {
    less: {
        watch: './src/less/*.less',
        compile: './src/less/[^_]*.less',
        output: './src/css/'
    }
};

gulp.task('watch', function () {
  gulp.watch(configs.less.watch, gulp.parallel('less'));
});

gulp.task('less', function () {

  return gulp.src(configs.less.compile)
    .pipe(less().on('error', function (err) {
        console.error(err.message);
        this.emit('end');
    }))
    .pipe(cssmin().on('error', function(err) {
        console.error(err.message);
        this.emit('end');
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(configs.less.output));

});

gulp.task('default', gulp.parallel('less', 'watch'));