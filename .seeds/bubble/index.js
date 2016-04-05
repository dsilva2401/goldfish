module.exports = function (parentBubble) {
		// Libs
		var Bubble = require('express-bubble');
		var fs = require('fs');
		var path = require('path');

	// Configuration
		var config = JSON.parse(fs.readFileSync( path.join(__dirname, 'config', 'main.json'), 'utf-8'));

	// Main bubble
		var bubble = new Bubble(config, parentBubble);

	// Setup databases
		bubble.run(require('./databases'));

	// Setup http-routes
		bubble.run(require('./http-routes'));

	// Init bubble
		bubble.run(require('./init'));

	// Export bubble
		return bubble;
}