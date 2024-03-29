/* Gulp should compile sass and make client side JS compatible - feel free to add your own tasks! */
const gulp = require('gulp');
const gulpSass = require('gulp-sass');
const nodeSass = require('node-sass');
const postcss = require('gulp-postcss');
const modules = require('postcss-modules');
const concat = require('gulp-concat');
const remember = require('gulp-remember');
const gulpTypescript = require('gulp-typescript');
const browserify = require('browserify');
const uglify = require('gulp-uglify');
const replace = require('gulp-replace');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const tap = require('gulp-tap');

gulpSass.compiler = nodeSass;

function scss() {
  return gulp.src(["src/**/*.scss"], { sourcemaps: true, since: gulp.lastRun(scss) })
    .pipe(gulpSass.sync())
    .pipe(gulp.dest('./build/'));
}

function cssModules() {
  return gulp.src(['build/**/*.css', '!build/styles/base.css'])
    .pipe(postcss([modules()]))
    .pipe(remember('cssModules'))
    .pipe(concat('modules.css'))
    .pipe(gulp.dest('./build/styles/'));
}

function typescript() {
  let tsProject = gulpTypescript.createProject('tsconfig.json');

  return gulp.src(['src/**/*.ts', 'src/**/*.tsx'])
    .pipe(tsProject())
    .js
    .pipe(gulp.dest('./build/'));
}

function handleCssImports() {
  return gulp.src('build/**/*.js')
    .pipe(replace('.scss\');', '.css.json\');'))
    .pipe(gulp.dest('./build/'))
}

function twig() {
  return gulp.src('src/**/*.twig')
    .pipe(gulp.dest('./build/'));
}

function browserifyFull() {
  return gulp.src('build/react/**/*.js', {read: false})
    .pipe(tap(function (file) {
      console.log('bundling ' + file.path);
      file.contents = browserify(file.path, {debug: true}).bundle();

    }))
    .pipe(buffer())
    .pipe(gulp.dest('build/react'));
}

exports.default = gulp.series(scss, cssModules, typescript, handleCssImports, twig, browserifyFull)