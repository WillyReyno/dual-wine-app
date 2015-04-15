var gulp = require('gulp'),
    gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    gp_uglify = require('gulp-uglify');

gulp.task('vendors', function(){
    return gulp.src(['app/js/*.js', 'app/js/**/*.js'])
        .pipe(gp_concat('concat_vendor.js'))
        .pipe(gulp.dest('vendors'));
});

gulp.task('modules', function(){
    return gulp.src(['node_modules/jquery/dist/jquery.min.js', 'node_modules/angular/angular.min.js',
        'node_modules/angular-route/angular-route.min.js', 'node_modules/angular-route/angular-route.min.js',
        'node_modules/angular-resource/angular-resource.min.js', 'node_modules/angular-ui-router/release/angular-ui-router.min.js'
    ])
        .pipe(gp_concat('concat_modules.js'))
        .pipe(gulp.dest('vendors'));
});

gulp.task('default', ['vendors', 'modules'], function(){});