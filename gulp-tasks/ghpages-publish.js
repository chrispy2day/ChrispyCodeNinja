'use strict';

const gulp = require('gulp');
const ghPages = require('gulp-gh-pages');

function publish() {
    return gulp.src('./build/bundled/**/*')
        .pipe(ghPages());
}


module.exports = {
    publish: publish
};