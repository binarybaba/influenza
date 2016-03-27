var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var jsFiles = ['*.js', 'app/*.js', 'app/**/*.js', 'public/**/*.js'];

gulp.task('inject', function () {
    var gulpInject = require('gulp-inject');
    var wiredep = require('wiredep').stream;

    //Mentioning where are *our* source files to inject
    var gulpInjectSrc = gulp.src(['./public/css/*.css', './public/js/*.js', './public/js/**/*.js'], {
        read: false
    });
    //Asking gulp to ignore the path-prefix when injecting
    var gulpInjectOptions = {
        ignorePath: '/public/',
    }

    var options = {
        bowerJson: require('./bower.json'), //take the bower from here, note the dependencies
        directory: './public/lib', //find those dependencies in this directory
        ignorePath: '../public/'
            //and ignore this path;
    };

    return gulp.src('./views/*.ejs') //pick these files
        .pipe(wiredep(options))
        .pipe(gulpInject(gulpInjectSrc, gulpInjectOptions))
        .pipe(gulp.dest('./views')); //after injecting, put it in this folder

});


gulp.task('serve', ['inject'], function () {
    var options = {
        script: 'server.js',
        delayTime: 1,
        env: {
            'PORT': 5000,
            'TWITTER_CONSUMER_KEY': 'xxx',
            'TWITTER_CONSUMER_SECRET': 'xxx',
            'TWITTER_TOKEN_KEY': 'xxx',
            'TWITTER_TOKEN_SECRET': 'xxx',
            'HOSTNAME': 'http://localhost:'
        },
        watch: jsFiles
    };
    return nodemon(options)
        .on('restart', function () {
            console.log('Restarting...');
        });

});
