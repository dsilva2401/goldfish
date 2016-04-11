module.exports = function ($) {
	var db = $.interfaces.databases('sequelize');
	var HTTPManager = $.interfaces.agents('HTTPManager');
	var System = {};

	System.updateConfig = function (req, res, next) {
		var response = new HTTPManager.Response(req, res);
		db.models.Configuration.findOrCreate({
			where: {
				sys: true
			}
		})
		// Success
		.then(function (configuration) {
			configuration = configuration[0];
			Object.keys(req.body).forEach(function (attr) {
				configuration[attr] = req.body[attr];
			});
			configuration.save()
			// Success
			.then( response.success )
			// Error
			.catch( response.error );
		})
		// Error
		.catch( response.error );
	}

	System.getConfig = function (req, res, next) {
		var response = new HTTPManager.Response(req, res);
		db.models.Configuration.findOne({
			where: {
				sys: true
			}
		})
		// Success
		.then( response.success )
		// Error
		.catch( response.error );
	}

	return System;
}