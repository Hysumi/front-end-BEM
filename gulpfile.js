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
var SCSS_SRC_DESKTOP = "./src/desktop.bundles/bundle/*.scss";
var SCSS_SRC_MOBILE = "./src/mobile.bundles/bundle/*.scss";

var SCSS_DEST_DESKTOP = "./src/desktop.bundles/bundle/";
var SCSS_DEST_MOBILE = "./src/mobile.bundles/bundle/";

/*
 * Compile SCSS
 */

gulp.task("compile_mobile_scss", function() {
    return gulp.src(SCSS_SRC_MOBILE)
    .pipe(sass().on("error", sass.logError))
    .pipe(minifyCSS())
    .pipe(rename({suffix: ".min"}))
    .pipe(changed(SCSS_DEST_MOBILE))
    .pipe(gulp.dest(SCSS_DEST_MOBILE));
});

gulp.task("compile_desktop_scss", function() {
    return gulp.src(SCSS_SRC_DESKTOP)
    .pipe(sass().on("error", sass.logError))
    .pipe(minifyCSS())
    .pipe(rename({suffix: ".min"}))
    .pipe(changed(SCSS_DEST_DESKTOP))
    .pipe(gulp.dest(SCSS_DEST_DESKTOP));
});

gulp.task("compile_scss", function () {
    gulp.start("compile_mobile_scss");
    gulp.start("compile_desktop_scss");
});

/*
 * Detect changes in SCSS
 */

gulp.task("watch_scss", function () {
    gulp.watch([SCSS_SRC_DESKTOP, SCSS_SRC_MOBILE], ["compile_scss"]);
});

/*
 * Run tasks
 */
gulp.task("default", ["watch_scss"]);
