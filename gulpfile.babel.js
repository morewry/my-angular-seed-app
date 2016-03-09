"use strict";

import fs from "fs";
import path from "path";
import gulp from "gulp";
import glpn from "gulp-load-plugins";

var plugins = glpn({
  pattern: ["gulp-*", "gulp.*", "autoprefixer", "csswring", "browser-sync"]
});

var getOptions = function () {
  return JSON.parse(fs.readFileSync("./app.config.json"));
};

var shutUp = function (error) {
  console.log(error.toString());
  this.emit("end");
}

const config = {
  server: {
    port: 9697
  },
  style: {
    processors: [
      plugins.autoprefixer(),
      plugins.csswring
    ]
  },
  script: {
    options: {
      presets: ["es2015"]
    }
  },
  markup: {
    options: {
      tags: ["@@", "@@"]
    }
  }
};

const paths = {
  server: {
    root: "dist/www"
  },
  style: {
    in: {
      dir: "src/style",
      file: "*.css"
    },
    out: {
      dir: "dist/www",
      file: "style.css"
    }
  },
  script: {
    in: {
      dir: "src/script",
      file: "*.js"
    },
    out: {
      dir: "dist/www",
      file: "script.js"
    }
  },
  markup: {
    in: {
      dir: "src/markup",
      file: "*.html"
    },
    out: {
      dir: "dist/www",
      file: null
    }
  }
};

gulp.task("server", () => {
  plugins.browserSync({
    port: config.server.port,
    server: {
      baseDir: paths.server.root
    }
  });
  // gulp.watch(["*.*"], {cwd: paths.www}, plugins.browserSync.reload);
});

gulp.task("html", () => {
  var opts = getOptions();
  return gulp.src(path.join(paths.markup.in.dir, paths.markup.in.file))
    .pipe(plugins.mustache(opts.markup.variables, config.markup.options, opts.markup.partials))
    .pipe(plugins.flatten())
    .on("error", shutUp)
    .pipe(gulp.dest(paths.markup.out.dir))
    .pipe(plugins.browserSync.reload({stream: true}))
});

gulp.task("css", () => {
  return gulp.src(path.join(paths.style.in.dir, paths.style.in.file))
    .pipe(plugins.postcss(config.style.processors))
    .pipe(plugins.concat(paths.style.out.file))
    .on("error", shutUp)
    .pipe(gulp.dest(paths.style.out.dir))
    .pipe(plugins.browserSync.reload({stream: true}))
});

gulp.task("js", () => {
  var opts, globs;
  opts = getOptions();
  globs = [].concat(opts.script.libs).concat([path.join(paths.script.in.dir, paths.script.in.file)]);
  return gulp.src(globs)
    .pipe(plugins.babel(config.script.options))
    .on("error", shutUp)
    .pipe(plugins.uglify())
    .pipe(plugins.concat(paths.script.out.file))
    .on("error", shutUp)
    .pipe(gulp.dest(paths.style.out.dir))
    .pipe(plugins.browserSync.reload({stream: true}))
});

gulp.task("build", ["html", "css", "js"]);

gulp.task("dev", ["build", "server"], () => {
  gulp.watch("./app.config.json", ["html", "js"]);
  gulp.watch(path.join(paths.markup.in.dir, paths.markup.in.file), ["html"]);
  gulp.watch(path.join(paths.style.in.dir, paths.style.in.file), ["css"]);
  gulp.watch(path.join(paths.script.in.dir, paths.script.in.file), ["js"]);
});

gulp.task("default", ["dev"]);
