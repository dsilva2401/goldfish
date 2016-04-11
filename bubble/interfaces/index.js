module.exports = function ($libs, $interfaces, $logger, $databases) {

	// Dependencies
		var $ = {};
		$.libs = $libs;
		$.logger = $logger;
		$.databases = $databases;

	// Define interfaces
		$libs.fs.readdirSync(__dirname).filter(function (elem) {
			return (elem != 'index.js');
		}).forEach(function (dir) {
			dir = dir.split('.')[0];
			$interfaces[dir] = require('./'+dir)($)
		});

}