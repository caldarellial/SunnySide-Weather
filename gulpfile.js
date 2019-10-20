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

function browserifyTask() {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './build/react/screens/HomePage.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('screens.js'))
    .pipe(buffer())
    // .pipe(uglify())
    .pipe(gulp.dest('./build/react/screens'));
}

exports.default = gulp.series(scss, cssModules, typescript, handleCssImports, twig, browserifyTask)