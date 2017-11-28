"use strict";

let gulp = require("gulp"),
	eslint = require("gulp-eslint");

gulp.task("lint", function() {
	return gulp.src("./modules/**/*.js")
		.pipe(eslint())			
		.pipe(eslint.format())
		.pipe(eslint.failOnError());
});
