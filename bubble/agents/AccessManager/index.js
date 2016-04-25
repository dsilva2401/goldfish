module.exports = function ($) {
	var AccessManager = {};

	AccessManager.People = require('./People')(AccessManager, $);
	AccessManager.Session = require('./Session')(AccessManager, $);
	AccessManager.Roles = require('./Roles')(AccessManager, $);

	return AccessManager;
}