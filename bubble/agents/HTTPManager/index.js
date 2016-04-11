module.exports = function ($) {
	var HTTPManager = {};

	HTTPManager.Logger = require('./Logger')(HTTPManager, $);
	HTTPManager.Response = require('./Response')(HTTPManager, $);

	return HTTPManager;
}