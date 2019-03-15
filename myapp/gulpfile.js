var gulp = require('gulp');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var miniCss = require('gulp-clean-css')
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
    gulp.src('public/css/*.css')
    .pipe(miniCss())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('output/css'))
    console.log('css文件打包完成');
  })
  // 监控public，routes，views下的文件改动
  gulp.task('auto',function(){
    gulp.watch(['public/**/*'],['script','css'])
  })
  gulp.task('default', ['script','css', 'auto'])