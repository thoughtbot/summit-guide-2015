var bourbon = require("node-bourbon"),
    bower = require("bower"),
    coffee = require("gulp-coffee"),
    concat = require("gulp-concat"),
    gulp = require("gulp"),
    gutil = require("gulp-util"),
    haml = require("gulp-haml"),
    neat = require("node-neat"),
    rename = require("gulp-rename"),
    sass = require("gulp-sass"),
    sh = require("shelljs");

var paths = {
  assets: "www/assets/",
  build: "www/",
  coffee: ["./source/assets/javascripts/**/*.coffee"],
  haml: ["./source/**/*.haml"],
  sass: ["./source/assets/stylesheets/**/*.scss"]
};

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

gulp.task("haml", function() {
  return gulp.src(paths.haml)
    .pipe(haml())
    .pipe(gulp.dest(paths.build));
});

coffeeStream = coffee({bare: true});
coffeeStream.on('error', function(err) {});

gulp.task("watch", function() {
  gulp.watch(paths.sass, ["sass"]);
  gulp.watch(paths.coffee, ["coffeescript"]);
  gulp.watch(paths.haml, ["haml"]);
});

gulp.task("install", function() {
  return bower.commands.install()
    .on("log", function(data) {
      gutil.log("bower", gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task("default", ["sass", "coffeescript", "haml"]);
