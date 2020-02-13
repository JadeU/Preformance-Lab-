
const sass = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
cssnano = require('gulp-cssnano'),
rename = require('gulp-rename');


const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const prettyError = require('pretty-error');
const terser = require('gulp-terser');
const eslint = require('gulp-eslint');


gulp.task('sass', function () {
return gulp
    .src('./sass/style.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./build/css'))
    .pipe(cssnano())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./build/css'));
});



gulp.task('scripts', function () {
return gulp
    .src('./js/*.js') // What files do we want gulp to consume?
    .pipe(terser()) // Call the terser function on these files
    .pipe(rename({ extname: '.min.js' })) // Rename the uglified file
    .pipe(gulp.dest('./build/js')); // Where do we put the result?
});



gulp.task('watch', function () {
gulp.watch('js/*.js', gulp.series('lint', 'scripts', 'reload'));
gulp.watch('./*.html', gulp.series('reload'));
gulp.watch('./sass/*.scss', gulp.series('sass', 'reload'));
//watch Sass files, if there are any changes, run the styles task
});


gulp.task('browser-sync', function () {
browserSync.init({
    server: {
        baseDir: './'
    }
});
});


gulp.task('say_hello', function (done) {
console.log('Hello!');
done();
});


gulp.task('lint', function () {
return gulp
    .src('./js/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});





//First run the default task, and then run scripts if any changes

gulp.task('reload', function (done) {
browserSync.reload();
done();
});


gulp.task('default', gulp.parallel('lint', 'scripts', 'sass', 'watch', 'browser-sync'));


