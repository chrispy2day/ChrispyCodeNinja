'use strict';

//const through = require('through2');
const gulp = require('gulp');
const gutil = require('gulp-util');
const del = require('del');
const markdownToJSON = require('gulp-markdown-to-json');
const marked = require('marked');
var data = require('gulp-data');
var jeditor = require("gulp-json-editor");
var nunjucksRender = require('gulp-nunjucks-render');
var rename = require('gulp-rename');

marked.setOptions({
  pedantic: true,
  smartypants: true
});

function cleanBlog() {
    return del('./src/blog/*.json');
}

var blog;
function buildBlog() {
    return gulp.src('./src/blog/*.md')
        .pipe(gutil.buffer())
        .pipe(markdownToJSON(marked, 'blog.json'))
        .pipe(jeditor(function(json) {
            blog = { posts: [] };
            var keys = Object.keys(json);
            for (var i = 0; i < keys.length; i++) {
                blog.posts.push(json[keys[i]]);
            }
            return blog;
        }))
        .pipe(gulp.dest('./src/blog/'));
}

function buildFeed() {
    return gulp.src('./src/blog/feed.njk')
        .pipe(data(function(file){ return blog; }))
        .pipe(nunjucksRender({
            path: 'src/templates'
        }))
        .pipe(rename('feed.xml'))
        .pipe(gulp.dest('./src/blog/'));
}

function cleanFeed() {
    return del('./src/blog/feed.xml');
}

module.exports = {
    cleanBlog: cleanBlog,
    buildBlog: buildBlog,
    buildFeed: buildFeed,
    cleanFeed: cleanFeed
};