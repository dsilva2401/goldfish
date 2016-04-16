module.exports = function ($) {
	var AccessManager = {};

	AccessManager.People = require('./People')(AccessManager, $);

	return AccessManager;
}