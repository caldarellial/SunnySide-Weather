/* Gulp should compile sass and make client side JS compatible - feel free to add your own tasks! */
const gulp = require('gulp');
const gulpSass = require('gulp-sass');
const nodeSass = require('node-sass');
const postcss = require('gulp-postcss');
const modules = require('postcss-modules');
const concat = require('gulp-concat');
const remember = require('gulp-remember');
const gulpTypescript = require('gulp-typescript');

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

function typescript() {
  let tsProject = gulpTypescript.createProject('tsconfig.json');

  return gulp.src(['src/**/*.ts', 'src/**/*.tsx'])
    .pipe(tsProject())
    .js
    .pipe(gulp.dest('./build/'));
}

function twig() {
  return gulp.src('src/**/*.twig')
    .pipe(gulp.dest('./build/'));
}

exports.default = gulp.series(scss, cssModules, typescript, twig)