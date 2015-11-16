// 获取 gulp
var gulp = require('gulp');
// 获取 uglify 模块（用于压缩 JS）
var uglify = require('gulp-uglify');
// 获取 gulp-minify-css 模块（用于压缩 css）
var minifyCss = require('gulp-minify-css');
// sass
var sass = require('gulp-sass');
// 图片压缩
var imagemin = require('gulp-imagemin');
// png深度压缩使用
var pngquant = require('imagemin-pngquant');

// 重命名
var rename = require('gulp-rename');
// 压缩 js 文件
// 在命令行使用 gulp script 启动此任务
gulp.task('script', function() {
    // 1. 找到文件
    gulp.src('js/*.js')
        // 2. 压缩文件
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        // 3. 另存压缩后的文件
        .pipe(gulp.dest('dist/js'));
});
// 执行sass
gulp.task('sass', function() {
    gulp.src('sass/**/*.scss')
        // 1.sass解析
        .pipe(sass())
        .pipe(gulp.dest('css'))
        // 2. 压缩css文件
        .pipe(minifyCss())
        // 4. 重命名
        .pipe(rename({
            suffix: '.min'
        }))
        // 3. 另存压缩后的文件
        .pipe(gulp.dest('dist/css'));

});
// 图片压缩
gulp.task('imagemin', function() {
    gulp.src('images/**/*')
        .pipe(imagemin({
            progressive: true, //默认：false 是否无损压缩jpg图片
            svgoPlugins: [{
                removeViewBox: false //不要移除svg的viewbox属性
            }],
            use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
        }))
        .pipe(gulp.dest('dist/images'));
});
// 在命令行使用 gulp auto 启动此任务
gulp.task('auto', function() {
    // 监听文件修改，当文件被修改则执行 script 任务
    gulp.watch('js/**/*.js', ['script']);
    gulp.watch('sass/**/*.scss', ['sass']);
});

// 使用 gulp.task('default') 定义默认任务
// 在命令行使用 gulp 启动 script 任务和 auto 任务
gulp.task('default', ['script', 'sass', 'imagemin', 'auto']);