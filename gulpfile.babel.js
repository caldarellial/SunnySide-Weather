/* Gulp should compile sass and make client side JS compatible - feel free to add your own tasks! */
import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import nodeSass from 'node-sass';

gulpSass.compiler = nodeSass;

function css() {
  return gulp.src('./*.scss')
    .pipe(gulp.dest('./build/css'));
}

export default gulp.parallel(css)