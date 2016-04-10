var gulp = require('gulp-param')(require('gulp'), process.argv);
var fs = require('fs-extra');
var path = require('path');
var repl = require('replace');
var inquirer = require('inquirer');
var methods = require('./build');

// Tasks
	gulp.task('bubble', function (install, remove, name) {
		inquirer.prompt([
			{
				type: 'list',
				name: 'action',
				message: 'Choose an action',
				choices: ['install', 'remove'],
				filter: function (val) {
					var map = {
						install: 'installBubble',
						remove: 'removeBubble'
					};
					return map[val];
				}
			},
			{
				type: 'input',
				name: 'name',
				message: 'Type the bubble name'
			},
			{
				type: 'confirm',
				name: 'confirm',
				message: 'Confirm this action?',
				default: true
			}
		]).then(function (answers) {
			if (!answers.confirm) {
				console.log('Operation cancelled');
				return;
			}
			methods[answers.action](answers.name);
		});
	});

	gulp.task('front-module', function (install, remove, seed, bubble, name) {

		// Install
		if (install) {
			methods.installFrontModule(seed, name, bubble);
			return;
		}
	
	});

	gulp.task('default', function () {
		inquirer.prompt([
			{
				type: 'list',
				name: 'task',
				message: 'What task do you want to execute?',
				choices: ['bubble', 'front-module']
			}
		]).then(function (answers) {
			gulp.start(answers.task)
		});
	});