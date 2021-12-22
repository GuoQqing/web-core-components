/**
 * 编译ts生成lib、es文件
 */
const gulp = require("gulp");
const babel = require("gulp-babel");
const clean = require("del");
const ts = require("gulp-typescript");
const merge = require("merge2");

const tsProject = ts.createProject("./tsconfig.json");
const ESDIR = "./es";
const LIBDIR = "./lib";

gulp.task("clean", () => {
  return clean(["lib"]);
});

gulp.task("cleanEs", () => {
  return clean(["es"]);
});

function moveLess(dir) {
  return gulp.src("./components/**/*.less").pipe(gulp.dest(dir));
}

// 编译ts
function compileTs() {
  return tsProject.src().pipe(tsProject());
}

function babelConfig(moduleType) {
  return {
    babelrc: false,
    presets: [
      ["@babel/preset-env", { modules: moduleType }],
      "@babel/preset-react",
      "@babel/preset-typescript",
    ],
    plugins: ["@babel/plugin-proposal-object-rest-spread"],
  };
}

gulp.task(
  "es",
  // 将任务函数和/或组合操作组合成更大的操作
  gulp.series("cleanEs", () => {
    const tsSream = compileTs(); // 编译ts
    const jsStream = tsSream.js // 编译ts后的js文件
      .pipe(babel(babelConfig(false))) // babel编译
      .pipe(gulp.dest(ESDIR)); // 存储到./es文件下
    const tsdStream = tsSream.dts.pipe(gulp.dest(ESDIR)); // 处理ts类型定义
    const cssStream = moveLess(ESDIR); // 处理css流
    return merge(jsStream, tsdStream, cssStream); // 合并文件
  })
);

// 发布打包
gulp.task(
  "lib",
  gulp.series("clean", () => {
    const tsSream = compileTs();
    const jsStream = tsSream.js
      .pipe(babel(babelConfig("commonjs")))
      .pipe(gulp.dest(LIBDIR));
    const tsdStream = tsSream.dts.pipe(gulp.dest(LIBDIR));
    const cssStream = moveLess(LIBDIR); // 处理css流
    return merge(jsStream, tsdStream, cssStream);
  })
);

gulp.task("default", gulp.series("lib", "es"));
