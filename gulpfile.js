"use strict";

/*
 * Dependencies
 */
var gulp = require("gulp");
var sass = require("gulp-sass");
var minifyCSS = require("gulp-clean-css");
var rename = require("gulp-rename");
var changed = require("gulp-changed");

/*
 * Path
 */
var SCSS_SRC = "./src/bundles/css-bundle/*.scss";
var SCSS_DEST = "./src/bundles/css-bundle/";

/*
 * Compile SCSS
 */

gulp.task("compile_scss", function () {
    return gulp.src(SCSS_SRC)
    .pipe(sass().on("error", sass.logError))
    .pipe(minifyCSS())
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest(SCSS_DEST));
});

/*
 * Detect changes in SCSS
 */

gulp.task("watch_scss", function () {
    gulp.watch([SCSS_SRC], ["compile_scss"]);
});

/*
 * Run tasks
 */
gulp.task("default", ["watch_scss"]);
