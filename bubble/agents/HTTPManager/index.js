module.exports = function ($) {
	var HTTPManager = {};

	HTTPManager.Logger = require('./Logger')(HTTPManager, $);
	HTTPManager.Response = require('./Response')(HTTPManager, $);
	HTTPManager.BubbleRouter = require('./BubbleRouter')(HTTPManager, $);

	return HTTPManager;
}