import yargs from 'yargs';
import del from 'del';
import runSequence from 'run-sequence';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

// gulp-babel, gulp-eslint, gulp-if, gulp-plumber, gulp-preprocess
const $ = gulpLoadPlugins();

const args = yargs
  .alias('p', 'production')
  .argv;

// To fix some eslint issues: gulp eslint --fix
const runEslint = () => {
  const isFixed = file => args.fix && file.eslint && file.eslint.fixed;
  return gulp.src([
    'gulp/**/*.js',
    'gulpfile.babel.js',
    'src/**/*.js',
  ], { base: './' })
    .pipe($.eslint({ fix: args.fix }))
    .pipe($.eslint.format())
    .pipe($.if(isFixed, gulp.dest('./')));
};

gulp.task('eslint', () => runEslint());

gulp.task('scripts', () => gulp.src('src/**/*.js')
    .pipe($.plumber(e => {
      console.log(e);
    }))
    .pipe($.preprocess({
      context: {
        NODE_ENV: args.p ? 'production' : 'development',
      },
    }))
    .pipe($.babel())
    .pipe(gulp.dest('dist')));

gulp.task('extras', () => gulp.src([
  'src/**/*',
  '!src/*.js',
  '!src/**/*.js',
], {
  dot: true,
}).pipe(gulp.dest('dist')));

gulp.task('clean', del.bind(null, ['dist']));

gulp.task('build', () => {
  runSequence('clean', ['scripts', 'extras']);
});

gulp.task('default', ['build'], () => {
  gulp.watch('src/**/*.js', ['scripts']);
  gulp.watch([
    'src/**/*',
    '!src/*.js',
    '!src/**/*.js',
  ], ['extras']);
})
