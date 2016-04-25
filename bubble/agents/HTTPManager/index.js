module.exports = function ($) {
	var HTTPManager = {};

	HTTPManager.Logger = require('./Logger')(HTTPManager, $);
	HTTPManager.Response = require('./Response')(HTTPManager, $);
	HTTPManager.BubbleRouter = require('./BubbleRouter')(HTTPManager, $);
	HTTPManager.GenericControllers = require('./GenericControllers')(HTTPManager, $);

	return HTTPManager;
}