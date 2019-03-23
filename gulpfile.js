var gulp = require('gulp'),
	minCSS = require('gulp-clean-css'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	autoprefixer = require('gulp-autoprefixer'),
    smartgrid = require('smart-grid'),
    gcmq = require('gulp-group-css-media-queries');


gulp.task('browser-sync', function() {
    browserSync({
        server: {
        baseDir: 'src'
        },
        notify: false,
    });
});

gulp.task('sass', function() {
    return gulp.src('src/sass/**/*.sass')
    .pipe(sass({outputStyle: 'expanded'}).on("error", sass.logError))
    // .pipe(minCSS())
    // .pipe(gcmq())
    .pipe(autoprefixer({
        browsers: ['last 10 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('src'))
    .pipe(browserSync.reload({stream: true})); 
});

gulp.task('default', function(cb) {
    gulp.parallel(
        'sass', 
        'browser-sync'
    )(cb);

gulp.watch('src/sass/**/*.sass', gulp.series('sass'));
gulp.watch('src/index.html').on('change', browserSync.reload); 
});


 
/* It's principal settings in smart grid project */
var settings = {
    outputStyle: 'src/sass', /* less || scss || sass || styl */
    columns: 12, /* number of grid columns */
    offset: '30px', /* gutter width px || % || rem */
    mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
    container: {
        maxWidth: '1200px', /* max-width оn very large screen */
        fields: '30px' /* side fields */
    },
    breakPoints: {
        lg: {
            width: '1100px', /* -> @media (max-width: 1100px) */
        },
        md: {
            width: '960px'
        },
        sm: {
            width: '780px',
            fields: '15px' /* set fields only if you want to change container.fields */
        },
        xs: {
            width: '560px'
        }
        /* 
        We can create any quantity of break points.
 
        some_name: {
            width: 'Npx',
            fields: 'N(px|%|rem)',
            offset: 'N(px|%|rem)'
        }
        */
    }
};

gulp.task('grid', function() {
    smartgrid('./sass', settings)
});