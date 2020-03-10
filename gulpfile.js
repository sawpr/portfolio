// gulp: 4.0.2

"use strict";

const gulp = require("gulp");

// Load plugins
const browserSync = require('browser-sync');
const cssnano = require('cssnano');
const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
const notify = require('gulp-notify');
const postcss = require('gulp-postcss');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const pug = require("gulp-pug");
const sass = require('gulp-sass');
const webpackStream = require("webpack-stream")
const webpack = require("webpack")

//setting : paths
const paths = {
  root: "./dist/",
  // htmlSrc: "./src/*.html",
  htmlDist: "./dist/",
  imgSrc: "./src/img/**/*.{jpg,jpeg,png,gif}",
  imgDist: "./dist/img/",
  cssSrc: "./src/scss/**/*.scss",
  cssDist: "./dist/css/",
  // js -> webpack
  jsSrc: "./src/js/**/*.js",
  jsDist: "./dist/js/",
  pugSrc: "./src/pug/*.pug",
}

const browserSyncOption = {
    server: {
        baseDir: paths.root,
        // index: 'html/index.html' 
    },
    port: 5000,
    reloadOnRestart: true,
}

// webpackの設定ファイルの読み込み
const webpackConfig = require("./webpack.config");

// HTML移動（pugに代替）
// function html() {
//     return gulp
//         .src(paths.htmlSrc)
//         .pipe(gulp.dest(paths.htmlDist));
// }

function html() {
  return gulp
    .src([paths.pugSrc, '!./src/pug/_*.pug'])
    .pipe(
      plumber({
        errorHandler: notify.onError("<%= error.message %>")
      })
    )
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(paths.htmlDist))
}

function css() {
  return gulp
    .src(paths.cssSrc)
    .pipe(plumber({
        errorHandler: notify.onError('<%= error.message %>'),
    }))
    .pipe(sass({
        outputStyle: 'expanded'
    }))
    .pipe(gulp.dest(paths.cssDist))
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(postcss([
        cssnano({
            autoprefixer: false
        })
    ]))
    .pipe(gulp.dest(paths.cssDist))
}

function img() {
  return gulp
    .src(paths.imgSrc)
    .pipe(imagemin([
      imagemin.gifsicle(),
      mozjpeg({ quality: 80}),
      pngquant(),
      imagemin.svgo()
    ], {
      verbose: false
    }))
    .pipe(imagemin())
    .pipe(gulp.dest(paths.imgDist))
    .pipe(browserSync.stream());
}

function webP() {
  return webpackStream(webpackConfig, webpack).pipe(gulp.dest(paths.jsDist))
}

function browsersync(done) {
  browserSync.init(browserSyncOption);
  done();
}

function watchFiles(done) {
  const browserReload = () => {
    browserSync.reload();
    done();
  };
  gulp.watch(paths.jsSrc).on("change", gulp.series(webP, browserReload))
  gulp.watch(paths.cssSrc).on("change", gulp.series(css, browserReload))
  gulp.watch(paths.imgSrc).on("change", gulp.series(img, browserReload))
  gulp.watch(paths.pugSrc).on("change", gulp.series(html, browserReload))
}

//Imagemin


exports.default = gulp.series(
  gulp.parallel(webP, css, img, html),
  gulp.series(browsersync, watchFiles)
)