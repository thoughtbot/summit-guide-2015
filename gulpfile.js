var gulp = require("gulp");
var gutil = require("gulp-util");
var bower = require("bower");
var concat = require("gulp-concat");
var sass = require("gulp-sass");
var rename = require("gulp-rename");
var sh = require("shelljs");

var paths = {
  assets: "www/assets/",
  sass: ["./source/assets/stylesheets/**/*.scss"]
};

gulp.task("default", ["sass"]);

gulp.task("sass", function(done) {
  gulp.src(paths.sass)
    .pipe(sass())
    .pipe(gulp.dest(paths.assets))
    .on("end", done);
});

gulp.task("watch", function() {
  gulp.watch(paths.sass, ["sass"]);
});

gulp.task("install", function() {
  return bower.commands.install()
    .on("log", function(data) {
      gutil.log("bower", gutil.colors.cyan(data.id), data.message);
    });
});
