'use strict';

//const through = require('through2');
const gulp = require('gulp');
const gutil = require('gulp-util');
const del = require('del');
const markdownToJSON = require('gulp-markdown-to-json');
const marked = require('marked');

marked.setOptions({
  pedantic: true,
  smartypants: true
});

function cleanBlog() {
    return del('./src/blog/*.json');
}

function buildBlog() {
    return gulp.src('./src/blog/*.md')
        .pipe(gutil.buffer())
        .pipe(markdownToJSON(marked, 'blog.json'))
        .pipe(gulp.dest('./src/blog/'));
}

module.exports = {
    cleanBlog: cleanBlog,
    buildBlog: buildBlog
};