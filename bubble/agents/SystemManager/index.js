module.exports = function ($) {
	var SystemManager = {};

	SystemManager.Configuration = require('./Configuration')(SystemManager, $);

	return SystemManager;
}