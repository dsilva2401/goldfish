// Libs
	var Bubble = require('express-bubble');
	var fs = require('fs');
	var path = require('path');

// Configuration
	var config = JSON.parse(fs.readFileSync( path.join(__dirname, 'config', 'main.json'), 'utf-8'));
	config.databases = JSON.parse(fs.readFileSync( path.join(__dirname, 'config', 'databases.json'), 'utf-8'));

// Main bubble
	var bubble = new Bubble(config, true);

// Enable logging
	bubble.enableLogging();

// Setup libs
	bubble.run(require('./libs'));

// Setup interfaces
	bubble.run(require('./interfaces'));

// Setup databases
	bubble.run(require('./databases'));

// Setup settings
	bubble.run(require('./setup'));

// Export bubble
	module.exports = bubble;