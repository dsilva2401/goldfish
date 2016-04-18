module.exports = function ($) {
	var SystemManager = {};

	SystemManager.Useful = require('./Useful')(SystemManager, $);
	SystemManager.Configuration = require('./Configuration')(SystemManager, $);

	return SystemManager;
}