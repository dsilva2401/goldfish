module.exports = function ($) {
	var db = $.interfaces.databases('sequelize');
	var HTTPManager = $.interfaces.agents('HTTPManager');
	var AccessManager = $.interfaces.agents('AccessManager');
	var Access = {};

    Access.register = function (req, res, next) {
    	var response = new HTTPManager.Response(req, res);
        AccessManager.People.register(req.body)
        // Success
		.then(function (person) {
            AccessManager.Session.create(person.id, res)
            // Success
            .then( response.success )
            // Error
            .catch( response.error );
        })
		// Error
		.catch(function(err) {
			if (err.name == 'SequelizeUniqueConstraintError') res.status(409);
			response.error(err);
		});
    }

    Access.login = function (req, res, next) {
    	var response = new HTTPManager.Response(req, res);
        AccessManager.People.verifyCredentials(req.body)
        // Success
		.then(function (credential) {
			if (!credential) {
				res.status(401);
				response.error({
					details: 'Invalid credentials'
				});
				return;
			}
			AccessManager.Session.create(credential.dataValues.PersonId, res)
			// Success
			.then( response.success )
			// Error
			.catch( response.error );
		})
		// Error
		.catch( response.error );
    }

    Access.getSession = function (req, res, next) {
        var response = new HTTPManager.Response(req, res);
        AccessManager.Session.get(req)
        // Success
        .then(function (person) {
            req.currentPerson = person;
            next();
        })
        // Error
        .catch( response.error );
    }

    Access.redirectIfSession = function (route) {
    	return function (req, res, next) {
    		if (!!!req.currentPerson) {
    			next();
    			return;
    		}
    		res.redirect(route);
    	}
    }

    Access.redirectIfNotSession = function (route) {
    	return function (req, res, next) {
    		if (!!req.currentPerson) {
    			next();
    			return;
    		}
    		res.redirect(route);
    	}
    }

	return Access;
}