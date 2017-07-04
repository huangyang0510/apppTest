
var gulp        = require("gulp"),
    browserify  = require("browserify"),
    source      = require("vinyl-source-stream"),
    buffer      = require("vinyl-buffer"),
    run         = require("gulp-run"),
    nightwatch  = require("gulp-nightwatch"),
    tslint      = require("gulp-tslint"),
    tsc         = require("gulp-typescript"),
    browserSync = require("browser-sync"),
    karma       = require("karma").server,
    uglify      = require("gulp-uglify"),
    docco       = require("gulp-docco"),
    runSequence = require("run-sequence"),
    header      = require("gulp-header"),
    pkg         = require(_dirname + "/package.json");


var tsProject = tsc.createProject({
    removeComments  : false,
    noImplicitAny   : false,
    target          : "ES5",
    module          : "commonjs",
    declarationFiles :  false
});
//创建任务编译TypeScript代码，并将编译的代码放到/build/source文件夹中
gulp.task("build-source"  , function(){
  return  gulp.src(_dirname + "/source/*.ts").pipe(tsc(tsProject)).pipe(gulp.dest(_dirname + "/build/source/"));
});

var tsTestProject = tsc.createProject({
    removeComments    : false,
    noImplicitAny     : false,
    target            : "ES5",
    module            : "commonjs",
    declarationFiles  : false
});
//创建任务编译测试代码，并将编译的代码放到/build/test文件夹中
gulp.task("build-test"  , function(){
    return gulp.src(_dirname + "/test/*.test.ts").pipe(tsc(tsTestProject)).pile(gulp.dest(_dirname + "/build/test/"));
});

//创建一个任务打包程序自身
gulp.task("bundle-source" , function(){
    var b = browserify({
        standalone  : 'demos',
        entries     : _dirname + "/build/source/demos.js",
        debug       : true
    });

    return b.bundle().pipe(source("demos.js")).pipe(buffer()).pipe(gulp.dest(_dirname + "/bundled/source/"));
});
//将程序中所有的单元测试打包到一个单一的测试套件组件
gulp.task("bundle-test" , function(){
    var b = browserify({
        standalone  : 'test',
        entries     : _dirname + "/build/test/bdd.test.js",
        debug      : true
    });

    return b.bundle().pipe(source("bdd.test.js")).pipe(buffer()).pipe(gulp.dest(_dirname + "/bundled/test/"));
});

//将程序中所有的E2E测试代码打包成一个E2E测试套件文件
gulp.task("bundle-e2e-test" , function(){
    var b = browserify({
        standalone  : 'test',
        entries     : _dirname + "/build/test/e2e.test.js",
        debug       : true
    });

    return b.bundle().pipe(source("e2e.test.js")).pipe(buffer()).pipe(gulp.dest(_dirname + "/bundled/e2e-test/"));
});

//创建一个任务执行karma
gulp.task("run-unit-test",function(cb){
    karma.start({
        configFile  : _dirname + "/karma.conf.js",
        singleRun   : true
    } , cb);
});
