module.exports = function ($interfaces, $agents, $app, $express, $config) {

	// Dependencies
		var $ = {};
		$.interfaces = $interfaces;
		$.app = $app;
		$.express = $express;
		$.config = $config;

	// Agents
		$agents.SystemManager = require('./SystemManager')($);
		$agents.HTTPManager = require('./HTTPManager')($);
		$agents.AccessManager = require('./AccessManager')($);
}