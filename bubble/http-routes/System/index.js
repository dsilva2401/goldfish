module.exports = function ($) {
	var HTTPManager = $.interfaces.agents('HTTPManager');
	var SystemManager = $.interfaces.agents('SystemManager');
	var System = {};

	System.updateConfig = function (req, res, next) {
		var response = new HTTPManager.Response(req, res);
		SystemManager.Configuration.update(req.body)
		// Success
		.then( response.success )
		// Error
		.catch( response.error );
	}

	System.getConfig = function (req, res, next) {
		var response = new HTTPManager.Response(req, res);
		SystemManager.Configuration.get()
		// Success
		.then( response.success )
		// Error
		.catch( response.error );
	}

	return System;
}