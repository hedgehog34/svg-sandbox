var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    svg2png = require('gulp-svg2png'),
    svgSymbols = require('gulp-svg-symbols'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass');

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

gulp.task('svg2png', function () {

    // Define source files
    //return gulp.src('assets/svg/icons/**/*.svg')

        // Run the svg2png npm module on these source files
        //.pipe(svg2png())

        // Define where the response is distributed to
        //.pipe(gulp.dest( 'assets/dist/icons/png/' ));
});

gulp.task('sprites', ['svg2png'], function () {
    return gulp.src('assets/svg/icons/**/*.svg')
		    .pipe(
			    svgSymbols({
			        className: '.icon--%f',
              title:      false
			    })
			)
			.pipe(gulp.dest( 'assets/dist/icons/' ));
});

gulp.task('sass', function () {
  return gulp.src('sass/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass())
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

gulp.task('sass:watch', function () {
  gulp.watch('sass/**/*.scss', ['prefixer']);
});