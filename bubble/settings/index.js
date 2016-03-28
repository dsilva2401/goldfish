module.exports = function ($config, $app, $express, $interfaces) {

	// Dependencies
	var $ = {};
	$.config = $config;
	$.app = $app;
	$.express = $express;
	$.interfaces = $interfaces;

	// Setup middleware
	require('./middleware')($);

	// Setup http routes
	require('./http-routes')($);

}