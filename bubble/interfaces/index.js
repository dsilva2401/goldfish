module.exports = function ($libs, $interfaces, $logger, $databases) {

	// Dependencies
	var $ = {};
	$.libs = $libs;
	$.logger = $logger;
	$.databases = $databases;

	// Define interfaces
	$interfaces.libs = require('./libs')($);
	$interfaces.databases = require('./databases')($);

}