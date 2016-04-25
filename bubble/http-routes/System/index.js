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

	System.getChilds = function (req, res, next) {
		var response = new HTTPManager.Response(req, res);
		var childs = [];
		HTTPManager.BubbleRouter.getChilds().forEach(function (child) {
			childs.push({
				name: child.name,
				url: child.name+'.'+$.config.domain
			});
		});
		// Success
		response.success(childs);
	}

	System.getViews = function (req, res, next) {
		var response = new HTTPManager.Response(req, res);
		var childs = [];
		HTTPManager.BubbleRouter.getViews(req.params.childName)
		// Success
		.then( response.success )
		// Error
		.catch( response.error );
	}

	return System;
}