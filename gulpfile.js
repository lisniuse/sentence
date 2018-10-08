const gulp = require('gulp');
const uglify = require('gulp-uglify');
const pump = require('pump');
const concat = require('gulp-concat'); //合并文件 --合并只是放一起--压缩才会真正合并相同样式
const less = require('gulp-less'); //编译less文件
const cssmin = require('gulp-minify-css'); //压缩css文件
const rename = require('gulp-rename'); //设置压缩后的文件名
const autoprefixer = require('gulp-autoprefixer'); //给 CSS 增加前缀。解决某些CSS属性不是标准属性，有各种浏览器前缀的情况

gulp.task('buildCSS', function () {
    var timestamp = +new Date();
    var flg = gulp.src('app/public/src/less/**/main.less') //该任务针对的文件
        .pipe(less()) //编译less
        .pipe(autoprefixer({
            browsers: ['last 2 versions','Safari >0', 'Explorer >0', 'Edge >0', 'Opera >0', 'Firefox >=20'],//last 2 versions- 主流浏览器的最新两个版本
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(concat('main.css')) //合并css
        .pipe(cssmin()) //压缩css
        .pipe(rename({suffix:'.min'})) //设置压缩文件名
        .pipe(gulp.dest('app/public/dist/css')) //输出文件的存放地址
        return flg; //反馈给依赖他的模块--，告诉执行完毕
});

gulp.task('compressJS', (cb) => {
    pump([
        gulp.src('app/public/src/js/*.js'),
        uglify({
            mangle: true,//类型：Boolean 默认：true 是否修改变量名
            compress: true,//类型：Boolean 默认：true 是否完全压缩
        }),
        rename({suffix:'.min'}),
        gulp.dest('app/public/dist/js')
    ], cb);
});

gulp.task('default',['compressJS', 'buildCSS']);