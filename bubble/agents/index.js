module.exports = function ($interfaces, $agents, $app, $express) {

	// Dependencies
		var $ = {};
		$.interfaces = $interfaces;
		$.app = $app;
		$.express = $express;

	// Agents
		$agents.SystemManager = require('./SystemManager')($);
		$agents.HTTPManager = require('./HTTPManager')($);
		$agents.AccessManager = require('./AccessManager')($);
}