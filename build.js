var gulp = require('gulp-param')(require('gulp'), process.argv);
var fs = require('fs-extra');
var path = require('path');
var repl = require('replace');
var inquirer = require('inquirer');
var methods = {};

// Methods

	methods.installBubble = function (bubbleName) {
		if (!bubbleName) {
			console.error('Error: Missing bubble name parameter');
			return;
		}
		var targetPath = path.join('bubble', 'childs', bubbleName);
		console.log('Installing bubble to =>', targetPath);
		fs.copySync( path.join('.seeds', 'bubble'), targetPath );
		// Replace paths
			repl({
				regex: 'REPLACE_THIS',
				replacement: bubbleName,
				paths: [targetPath],
				recursive: true,
				silent: true,
			});
	}

	methods.removeBubble = function (bubbleName) {
		if (!bubbleName) {
			console.error('Error: Missing bubble name parameter');
			return;
		}
		var targetPath = path.join('bubble', 'childs', bubbleName);
		console.log('Removing bubble =>', targetPath);
		fs.removeSync(targetPath);
	}

	methods.installFrontModule = function (seed, name, bubble) {
		if (!seed) {
			console.error('Error: Missing seed parameter');
			return;
		}
		if (!name) {
			console.error('Error: Missing name parameter');
			return;
		}
		// Copy seed
			var targetPath = path.join('statics/modules', name);
			if (!bubble) targetPath = path.join('bubble', targetPath);
			else targetPath = path.join('bubble/childs', bubble, targetPath);
			console.log('Installing '+seed+' to =>', targetPath);
			fs.copySync( path.join('.seeds', seed), targetPath );
			// Replace paths
			repl({
				regex: seed,
				replacement: name,
				paths: [targetPath],
				recursive: true,
				silent: true,
			});
	}

module.exports = methods;