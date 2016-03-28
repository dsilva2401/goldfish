module.exports = function ($libs, $interfaces, $logger, $transporters, $databases) {

	// Dependencies
	var $ = {};
	$.libs = $libs;
	$.transporters = $transporters;
	$.logger = $logger;
	$.databases = $databases;

	// Define interfaces
	$interfaces.libs = require('./libs')($);
	$interfaces.databases = require('./databases')($);
	$interfaces.transporters = require('./transporters')($);

}