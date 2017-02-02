'use strict';

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

function comparePosts(a, b) {
    var aDate = a.lastUpdatedAt || a.createdAt || a.updatedAt;
    var bDate = b.lastUpdatedAt || b.createdAt || b.updatedAt;
    if (aDate < bDate)
        return 1; // normally this would be -1, but want descending order
    if (aDate > bDate)
        return -1;
    return 0;
}

var blog;
function buildBlog() {
    return gulp.src('./src/blog/*.md')
        .pipe(gutil.buffer())
        .pipe(markdownToJSON(marked, 'blog.json'))
        .pipe(jeditor(function(json) {
            // this section is used to simplify the json structure
            // from the default created by markdownToJSON
            blog = { posts: [] };
            var keys = Object.keys(json);
            for (var i = 0; i < keys.length; i++) {
                blog.posts.push(json[keys[i]]);
            }

            // sort the posts
            blog.posts.sort(comparePosts);
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