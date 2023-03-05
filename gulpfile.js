import gulp from "gulp";
import uglify from "gulp-uglify";
import sass from "sass";
import gulpSass from "gulp-sass";
import concat from "gulp-concat";
import babel from "gulp-babel";
import watch from "gulp-watch";

const scss = gulpSass(sass);

const SRC_DIR = "./src/";
const DIST_DIR = "./dist/";

const JS_DIR = SRC_DIR + "./js/**/*.js";
const SCSS_DIR = SRC_DIR + "./scss/**/*.scss";

async function js() {
  gulp.src(JS_DIR).pipe(babel()).pipe(uglify()).pipe(concat("all.js")).pipe(gulp.dest(DIST_DIR));
}

async function sassCompilation() {
  gulp.src(SCSS_DIR).pipe(concat("all.css")).pipe(scss()).pipe(gulp.dest(DIST_DIR));
}

async function watchScss() {
  gulp.watch(SCSS_DIR, sassCompilation);
}

gulp.task("sass-compilation", sassCompilation);
gulp.task("js", js);
gulp.task("watch-scss", watchScss);

gulp.task("default", gulp.parallel(["js", "watch-scss"]));
