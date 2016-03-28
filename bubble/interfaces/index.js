module.exports = function ($libs, $interfaces, $logger) {
	// Dependencies
	var $ = {};
	$.libs = $libs;
	$.logger = $logger;

	// Define interfaces
	$interfaces.libs = require('./libs')($);
	$interfaces.databases = require('./databases')($);
}