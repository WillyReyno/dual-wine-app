var gulp = require('gulp'),
    gp_concat = require('gulp-concat'),
    watch = require('gulp-watch');

gulp.task('vendors', function(){
    return gulp.src(['app/js/*.js', 'app/js/**/*.js'])
        .pipe(gp_concat('concat_vendor.js'))
        .pipe(gulp.dest('vendors'));
});

gulp.task('modules', function(){
    return gulp.src(['node_modules/jquery/dist/jquery.min.js', 'node_modules/angular/angular.min.js',
        'node_modules/angular-route/angular-route.min.js', 'node_modules/angular-route/angular-route.min.js',
        'node_modules/angular-resource/angular-resource.min.js', 'node_modules/angular-ui-router/release/angular-ui-router.min.js',
        'node_modules/angular-flash-alert/dist/angular-flash.min.js'
    ])
        .pipe(gp_concat('concat_modules.js'))
        .pipe(gulp.dest('vendors'));
});

gulp.task('watch', function() {
    gulp.watch(['app/js/*.js', 'app/js/**/*.js'], ['vendors']);
    //gulp.watch(['node_modules/jquery/dist/jquery.min.js', 'node_modules/angular/angular.min.js',
    //    'node_modules/angular-route/angular-route.min.js', 'node_modules/angular-route/angular-route.min.js',
    //    'node_modules/angular-resource/angular-resource.min.js', 'node_modules/angular-ui-router/release/angular-ui-router.min.js',
    //    'node_modules/angular-flash-alert/dist/angular-flash.min.js'
    //], ['modules']);
});
gulp.task('default', ['vendors', 'modules'], function(){});