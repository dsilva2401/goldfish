module.exports = function (AccessManager, $) {
	var Q = $.interfaces.libs('Q');
	var db = $.interfaces.databases('sequelize');
	var SystemManager = $.interfaces.agents('SystemManager');
	var Session = {};

	Session.create = function (personId, res) {
		var deferred = Q.defer();
		
		db.models.SessionKey.create({
			PersonId: personId,
			key: SystemManager.Useful.createRandomWord(30)
		})
		// Success
		.then(function (session) {
			res.cookie('skui', personId);
			res.cookie('skk', session.dataValues.key);
			deferred.resolve(session);
		})
		// Error
		.catch( deferred.reject );

		return deferred.promise;
	}

	Session.get = function (req) {
		var deferred = Q.defer();
		
		db.models.SessionKey.findOne({
			where: {
				PersonId: req.cookies.skui,
				key: req.cookies.skk
			}
		})
		// Success
		.then(function (session) {
			if (!session) {
				deferred.resolve(null);
				return;
			}
			db.models.Person.findById(session.dataValues.PersonId)
			// Success
			.then( deferred.resolve )
			// Error
			.catch( deferred.reject );
		})
		// Error
		.catch( deferred.reject );

		return deferred.promise;
	}

	return Session;
}