module.exports = function ($interfaces, $agents, $app) {

	// Dependencies
		var $ = {};
		$.interfaces = $interfaces;
		$.app = $app;

	// Agents
		$agents.SystemManager = require('./SystemManager')($);
		$agents.HTTPManager = require('./HTTPManager')($);
		$agents.AccessManager = require('./AccessManager')($);
}