module.exports = function ($config, $interfaces, $databases, $parent) {

	// Dependencies
		var $ = {};
		$.config = $config;
		$.interfaces = $interfaces;

	// Databases
		$parent.interfaces.libs('fs').readdirSync(__dirname).filter(function (elem) {
			return (elem != 'index.js');
		}).forEach(function (dir) {
			$databases[dir] = require('./'+dir)($)
		});

}