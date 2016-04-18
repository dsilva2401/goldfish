module.exports = function ($interfaces, $agents) {

	// Dependencies
		var $ = {};
		$.interfaces = $interfaces;

	// Agents
		$agents.SystemManager = require('./SystemManager')($);
		$agents.HTTPManager = require('./HTTPManager')($);
		$agents.AccessManager = require('./AccessManager')($);
}