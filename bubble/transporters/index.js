module.exports = function ($transporters, $interfaces, $config) {

	// Dependencies
	var $ = {};
	$.interfaces = $interfaces;
	$.config = $config;

	// Transporters
	$transporters.http = require('./http')($);

}