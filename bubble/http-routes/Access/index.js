module.exports = function ($) {
	var db = $.interfaces.databases('sequelize');
	var HTTPManager = $.interfaces.agents('HTTPManager');
	var AccessManager = $.interfaces.agents('AccessManager');
	var Access = {};

    Access.register = function (req, res, next) {
    	var response = new HTTPManager.Response(req, res);
        AccessManager.People.register(req.body)
        // Success
		.then( response.success )
		// Error
		.catch(function(err) {
			if (err.name == 'SequelizeUniqueConstraintError') res.status(409);
			response.error(err);
		});
    }

	return Access;
}