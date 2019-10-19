/* Gulp should compile sass and make client side JS compatible - feel free to add your own tasks! */
import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import nodeSass from 'node-sass';
import postcss from 'gulp-postcss';
import modules from 'postcss-modules';
import concat from 'gulp-concat';
import remember from 'gulp-remember';

gulpSass.compiler = nodeSass;

function scss() {
  return gulp.src(["src/**/*.scss"], { sourcemaps: true, since: gulp.lastRun(scss) })
    .pipe(gulpSass.sync())
    .pipe(gulp.dest('./build/'));
}

function cssModules() {
  return gulp.src('build/**/*.css')
    .pipe(postcss([modules()]))
    .pipe(remember('cssModules'))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./build/'));
}

export default gulp.series(scss, cssModules)