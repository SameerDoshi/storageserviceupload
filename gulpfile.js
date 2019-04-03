var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var bytediff = require('gulp-bytediff');
var rename = require('gulp-rename');
var babel = require("gulp-babel");

var templateCache = require('gulp-angular-templatecache');
var angularTemplateCache = require('gulp-angular-templatecache');
var addStream = require('add-stream');
//var ngAnnotate = require('gulp-ng-annotate');
var plumber = require('gulp-plumber');

var src='.',
    jsFiles =src+'/app/**/*.js',
    htmlFiles=src+'/app/**/*.html',
    jsDest = src+'/dist/',
    devDest = src+'/../vote/web/',
    templatesDest=jsDest+'/templatecache/'



var watch = require('gulp-watch');
var batch = require('gulp-batch');

gulp.task('build', function () {
    console.log('Working!');
});

gulp.task('watch', function () {
    console.log("Watching: " + htmlFiles + " & "+ jsFiles);
    gulp.watch(htmlFiles, gulp.series('default-dev'));
    gulp.watch(jsFiles, gulp.series('default-dev'));
});


function prepareTemplates() {
    return gulp.src(htmlFiles)
    //.pipe(minify and preprocess the template html here)
        .pipe(angularTemplateCache());
       // .pipe(gulp.dest(jsDest));
}

gulp.task('default-dev', function() {
    return gulp.src(jsFiles)
        .pipe(plumber())
        .pipe(addStream.obj(prepareTemplates()))
        .pipe(concat('app.js'))
        .pipe(babel())
        .pipe(bytediff.start())
        .pipe(bytediff.stop())
        .pipe(plumber.stop())
        .pipe(gulp.dest(jsDest))
        .pipe(gulp.dest(devDest));;
});

gulp.task('default', function() {
    return gulp.src(jsFiles)
    .pipe(plumber())
        .pipe(addStream.obj(prepareTemplates()))
        .pipe(concat('app.js'))
        .pipe(babel())
        .pipe(bytediff.start())
        .pipe(uglify({mangle: true}))
        .pipe(bytediff.stop())
        .pipe(plumber.stop())
        .pipe(gulp.dest(jsDest))
        .pipe(gulp.dest(devDest));;
});