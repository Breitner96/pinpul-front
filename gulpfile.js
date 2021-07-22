const gulp = require('gulp');
const sass = require('gulp-sass');

function css() {
    return gulp.src('./node_modules/slider-carousel/**/**/*.scss')
      .pipe(sass({
          outputStyle:'compressed'
      }))
      .pipe(gulp.dest('./node_modules/slider-carousel/css'));
  }

exports.default = gulp.series(css);
