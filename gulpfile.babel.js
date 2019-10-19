/* Gulp should compile sass and make client side JS compatible - feel free to add your own tasks! */
import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import nodeSass from 'node-sass';
import postcss from 'gulp-postcss';
import modules from 'postcss-modules';
import concat from 'gulp-concat';

gulpSass.compiler = nodeSass;

function css() {
  /*return gulp.src('*.scss')
    .pipe(gulpSass.sync())
    .pipe(gulp.dest('./build/css'));*/
  return gulp.src(["src/**/*.scss"], { sourcemaps: true, since: gulp.lastRun(css) })
  .pipe(gulpSass.sync())
  .pipe(gulp.dest('./build/css'))
  .pipe(postcss([modules()]))
  .pipe(concat('styles.css'));
}

export default gulp.parallel(css)