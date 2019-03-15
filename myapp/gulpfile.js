var gulp = require('gulp');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var miniCss = require('gulp-clean-css')
var miniImg = require('gulp-imagemin')
var miniLess = require('gulp-less')
  // 压缩
  gulp.task('script',function(){
    gulp.src('public/js/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('output/js'));
  })
  // css压缩
  gulp.task('css',function(){
    gulp.src('public/css/*.less')
    .pipe(miniLess())
    .pipe(miniCss())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('output/css'))
  })
  // 压缩图片
  gulp.task('img',function(){
    gulp.src('public/images/*')
    .pipe(miniImg())
    .pipe(gulp.dest('output/images'))
  })
  // 监控public，routes，views下的文件改动
  gulp.task('auto',function(){
    gulp.watch(['public/**/*'],['script','css','img'])
  })
  gulp.task('default', ['script','css','img', 'auto'])