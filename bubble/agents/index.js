module.exports = function ($interfaces, $agents) {

	// Dependencies
		var $ = {};
		$.interfaces = $interfaces;

	// Agents
		$agents.HTTPManager = require('./HTTPManager')($);
		$agents.SystemManager = require('./SystemManager')($);
		$agents.AccessManager = require('./AccessManager')($);
}