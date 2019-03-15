var gulp = require('gulp');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

  // 压缩
  gulp.task('script',function(){
    gulp.src('public/js/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('output/'));
  })
  // 监控public，routes，views下的文件改动
  gulp.task('auto',function(){
    gulp.watch('public/js/*.js',['script'])
  })
  gulp.task('default', ['script', 'auto'])