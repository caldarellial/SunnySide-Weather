/* Gulp should compile sass and make client side JS compatible - feel free to add your own tasks! */
import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import nodeSass from 'node-sass';

gulpSass.compiler = nodeSass;

gulp.task('sass', () =>
  gulp.src('./*.scss')
  .pipe(gulpSass.on())
  .pipe(gulp.dest('./css'))
);