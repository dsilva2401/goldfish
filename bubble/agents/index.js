module.exports = function ($interfaces, $agents) {

	// Dependencies
		var $ = {};
		$.interfaces = $interfaces;

	// Agents
		$agents.HTTPManager = require('./HTTPManager')($);
}