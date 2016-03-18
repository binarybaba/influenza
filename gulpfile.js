var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var jsFiles = ['*.js', 'app/*.js','app/**/*.js', 'public/**/*.js'];

gulp.task('inject', function(){
    var gulpInject = require('gulp-inject');
    var wiredep = require('wiredep').stream;
    
    //Mentioning where are *our* source files to inject
    var gulpInjectSrc = gulp.src(['./public/css/*.css','./public/js/*.js', './public/js/**/*.js'],{
        read:false
    });
    //Asking gulp to ignore the path-prefix when injecting
    var gulpInjectOptions = {
        ignorePath:'/public/'
    }
    
    var options= {
        bowerJson:require('./bower.json'), //take the bower from here, note the dependencies
        directory:'./public/lib', //find those dependencies in this directory
        //and ignore this path;
    };
    
    return gulp.src('./public/*.ejs') //pick these files
        .pipe(wiredep(options))
        .pipe(gulpInject(gulpInjectSrc, gulpInjectOptions))
        .pipe(gulp.dest('./public')); //after injecting, put it in this folder
    
});


gulp.task('serve',['inject'], function(){
    var options = {
        script:'server.js',
        delayTime:1,
        env:{
            'PORT':5000,
            'TWITTER_CONSUMER_KEY':'1zR8jKx8gtQuIawPOcQlz3cDW',
            'TWITTER_CONSUMER_SECRET':'ip8sO8IywpLcHcbVqRIdr5vEug5wasKqqPIoPEvJlzpAQlAQi0',
            'TWITTER_TOKEN_KEY':'54500095-j3bB2U2mfEBHDwtB2njzY0wQqTeUJNNP5CTQCneOa',
            'TWITTER_TOKEN_SECRET':'cEJHGvccpvN7FfJrOq8UvB5IzncBcnEKkMdejkjcaLrmB'
        },
        watch:jsFiles
    };
    return nodemon(options)
        .on('restart', function(){
            console.log('Restarting...');
    });
    
});
