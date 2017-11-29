"use strict";

let gulp = require("gulp"),
	eslint = require("gulp-eslint");

gulp.task("lint", function() {
	return gulp.src(["./**/*.js", "!node_modules/**", "!./public/lib/**", "!dist/**"])
		.pipe(eslint())			
		.pipe(eslint.format())
		.pipe(eslint.failOnError());
});
