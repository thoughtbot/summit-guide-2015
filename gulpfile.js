var gulp = require("gulp");
var gutil = require("gulp-util");
var bower = require("bower");
var concat = require("gulp-concat");
var sass = require("gulp-sass");
var rename = require("gulp-rename");
var sh = require("shelljs");
var coffee = require("gulp-coffee");
var bourbon = require("node-bourbon");
var neat = require("node-neat");

var paths = {
  assets: "www/assets/",
  coffee: ["./source/assets/javascripts/**/*.coffee"],
  sass: ["./source/assets/stylesheets/**/*.scss"]
};

gulp.task("default", ["sass"]);

gulp.task("sass", function(done) {
  gulp.src(paths.sass)
    .pipe(sass({
      includePaths: bourbon.includePaths,
      includePaths: neat.includePaths
    }))
    .pipe(gulp.dest(paths.assets))
    .on("end", done);
});

gulp.task("coffeescript", function() {
  return gulp.src(paths.coffee)
    .pipe(coffee())
    .pipe(concat("application.js"))
    .pipe(gulp.dest(paths.assets));
});

coffeeStream = coffee({bare: true});
coffeeStream.on('error', function(err) {});

gulp.task("watch", function() {
  gulp.watch(paths.sass, ["sass"]);
  gulp.watch(paths.coffee, ["coffeescript"]);
});

gulp.task("install", function() {
  return bower.commands.install()
    .on("log", function(data) {
      gutil.log("bower", gutil.colors.cyan(data.id), data.message);
    });
});
