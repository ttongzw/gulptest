// 获取 gulp
var gulp = require('gulp')
    // 获取 uglify 模块（用于压缩 JS）
var uglify = require('gulp-uglify')
    // 获取 gulp-minify-css 模块（用于压缩 css）
var minifyCss = require('gulp-minify-css')
    // sass
var sass = require('gulp-sass');
// 压缩 js 文件
// 在命令行使用 gulp script 启动此任务
gulp.task('script', function() {
    // 1. 找到文件
    gulp.src('js/*.js')
        // 2. 压缩文件
        .pipe(uglify())
        // 3. 另存压缩后的文件
        .pipe(gulp.dest('dist/js'));
});
// 执行sass
gulp.task('sass', function() {
    gulp.src('sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(gulp.dest('dist/css'));
    gulp.task('css');
});
// 压缩css
gulp.task('css', function() {
    // 1. 找到文件
    gulp.src('css/**/*.css')
        // 2. 压缩文件
        .pipe(minifyCss())
        // 3. 另存压缩后的文件
        .pipe(gulp.dest('dist/css'));
});
// 在命令行使用 gulp auto 启动此任务
gulp.task('auto', function() {
    // 监听文件修改，当文件被修改则执行 script 任务
    gulp.watch('js/**/*.js', ['script']);
    gulp.watch('css/**/*.css', ['css']);
    gulp.watch('sass/**/*.scss', ['sass']);
})

// 使用 gulp.task('default') 定义默认任务
// 在命令行使用 gulp 启动 script 任务和 auto 任务
gulp.task('default', ['script', 'sass', 'auto'])