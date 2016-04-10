var gulp = require('gulp-param')(require('gulp'), process.argv);
var fs = require('fs-extra');
var path = require('path');
var repl = require('replace');
var inquirer = require('inquirer');
var methods = require('./build');

// Tasks
	gulp.task('bubble', function () {
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
		var childs = fs.readdirSync('bubble/childs').filter(function (child) {
			return (child != 'index.js');
		});
		childs.push('none');
		console.log(childs);
		inquirer.prompt([
			{
				type: 'list',
				name: 'action',
				message: 'Choose an action',
				choices: ['install'],
				filter: function (val) {
					var map = {
						install: 'installFrontModule'
					};
					return map[val];
				}
			},
			{
				type: 'list',
				name: 'seed',
				message: 'Choose a seed',
				choices: ['angular-seed', 'console-seed']
			},
			{
				type: 'input',
				name: 'name',
				message: 'Type the module name'
			},
			{
				type: 'list',
				name: 'bubble',
				message: 'Choose an bubble',
				choices: childs,
				filter: function (val) {
					return ( val=='none' ? null : val );
				}
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
			methods[answers.action](answers.seed, answers.name, answers.bubble);
		});
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