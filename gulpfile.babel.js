"use strict";

import fs from "fs";
import path from "path";
import gulp from "gulp";
import glpn from "gulp-load-plugins";

var config;
var getConfig = function () {
  var callbacks = arguments;
  fs.readFile("./gulpconfig.json", "utf8", (err, data) => {
    config = JSON.parse(data);
    Array.prototype.forEach.call(callbacks, (callback) => {
      callback(err, config);
    });
  });
}

var plugins;
var loadPlugins = function (err, config) {
  if (typeof err === "undefined" || err === null) {
    plugins = glpn(config.options.plugins.opts);
    return plugins;
  }
}

var shutUp = function (error) {
  console.log(error.toString());
  this.emit("end");
}

var extendGlob = function (type) {
  var globs = [];
  if (config.options[type].libs) {
    globs = globs.concat(config.options[type].libs);
  }
  if (config.paths[type].in.dir || config.paths[type].in.file) {
    globs = globs.concat([path.join(config.paths[type].in.dir, config.paths[type].in.file)]);
  }
  return globs;
}

gulp.task("options", (done) => {
  getConfig(loadPlugins, done);
});

gulp.task("server", ["options"], () => {
  plugins.browserSync({
    port: config.options.server.port,
    server: {
      baseDir: config.paths.server.root
    }
  });
  // gulp.watch(["*.*"], {cwd: config.paths.www}, plugins.browserSync.reload);
});

gulp.task("build.html", ["options"], () => {
  return gulp.src(extendGlob("markup"))
    .pipe(plugins.plumber({errorHandler: shutUp}))
    .pipe(plugins.mustache(config.options.markup.variables, config.options.markup.opts, config.options.markup.partials))
    .pipe(plugins.flatten())
    .pipe(gulp.dest(config.paths.markup.out.dir))
    .pipe(plugins.browserSync.reload({stream: true}))
});

gulp.task("build.css", ["options"], () => {
  return gulp.src(extendGlob("style"))
    .pipe(plugins.plumber({errorHandler: shutUp}))
    .pipe(plugins.postcss(config.options.style.processors.map(function (processor) {
      return processor.call ? plugins[processor.name](processor.opts) : plugins[processor.name];
    })))
    .pipe(plugins.concat(config.paths.style.out.file))
    .pipe(gulp.dest(config.paths.style.out.dir))
    .pipe(plugins.browserSync.reload({stream: true}))
});

gulp.task("build.js", ["options"], () => {
  return gulp.src(extendGlob("script"))
    .pipe(plugins.plumber({errorHandler: shutUp}))
    .pipe(plugins.babel(config.options.script.opts))
    .pipe(plugins.uglify())
    .pipe(plugins.concat(config.paths.script.out.file))
    .pipe(gulp.dest(config.paths.style.out.dir))
    .pipe(plugins.browserSync.reload({stream: true}))
});

gulp.task("build", ["build.html", "build.css", "build.js"]);

gulp.task("watch.config", () => {
  gulp.watch("./gulpconfig.json", ["build"]);
});

gulp.task("watch.markup", ["options"], () => {
  gulp.watch(path.join(config.paths.markup.in.dir, config.paths.markup.in.file), ["build.html"]);
});

gulp.task("watch.style", ["options"], () => {
  gulp.watch(path.join(config.paths.style.in.dir, config.paths.style.in.file), ["build.css"]);
});

gulp.task("watch.script", ["options"], () => {
  gulp.watch(path.join(config.paths.script.in.dir, config.paths.script.in.file), ["build.js"]);
});

gulp.task("watch", ["watch.config", "watch.markup", "watch.style", "watch.script"]);

gulp.task("dev", ["build", "server", "watch"]);

gulp.task("default", ["dev"]);
