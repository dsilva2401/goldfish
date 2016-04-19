module.exports = function ($libs, $interfaces, $logger, $databases, $agents, $childs) {

	// Dependencies
		var $ = {};
		$.libs = $libs;
		$.logger = $logger;
		$.databases = $databases;
		$.agents = $agents;

	// Define interfaces
		$libs.fs.readdirSync(__dirname).filter(function (elem) {
			return (elem != 'index.js');
		}).forEach(function (dir) {
			dir = dir.split('.')[0];
			$interfaces[dir] = require('./'+dir)($)
		});

}