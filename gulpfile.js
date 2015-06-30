var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    svgSymbols = require('gulp-svg-symbols'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    install = require("gulp-install"),
    del = require('del');

gulp.src(['./bower.json', './package.json'])
  .pipe(install());

gulp.task('clean', function(cb) {
    del(['./css', 'js/dist', './assets/dist/icons'], cb)
});

gulp.task('js', function () {
    return gulp.src('js/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(concat('base.min.js'))
      .pipe(sourcemaps.write('/'))
      .pipe(gulp.dest('js/dist'));
});

gulp.task('sprites', function () {
    return gulp.src('assets/svg/icons/**/*.svg')
		    .pipe(
			    svgSymbols({
			        className: '.icon--%f',
              title:      false
			    })
			)
			.pipe(gulp.dest( 'assets/dist/icons/' ));
});

// More options for node-sass - https://github.com/sass/node-sass#options
gulp.task('sass', function () {
  return gulp.src('sass/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'compact'}))  // CSS output style (nested | expanded | compact | compressed)
      .pipe(sourcemaps.write('../css'))
      .pipe(gulp.dest('css'));
});

gulp.task('prefixer', ['sass'], function () {
    return gulp.src('css/base.css')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: true
        }))
        .pipe(sourcemaps.write('../css'))
        .pipe(gulp.dest('css'));
});

gulp.task('watch', function () {

  gulp.watch('sass/**/*.scss', ['prefixer']);

});

gulp.task('default', ['clean'], function() {
    gulp.start('js', 'sprites', 'prefixer', 'watch');
});