module.exports = function (AccessManager, $) {
	var Q = $.interfaces.libs('Q');
	var md5 = $.interfaces.libs('md5');
	var db = $.interfaces.databases('sequelize');
	var People = {};

	People.register = function (personData) {
		var deferred = Q.defer();
		
		db.models.Person.create(personData)
		// Success
		.then(function (person) {
			db.models.Credential.create({
				PersonId: person.id,
				email: person.dataValues.email,
				password: md5(personData.password)
			})
			// Success
			.then(function () {
				deferred.resolve(1);
			})
			// Error
			.catch( deferred.reject );
		})
		// Error
		.catch( deferred.reject );

		return deferred.promise;
	}

	People.verifyCredentials = function (credentials) {
		var deferred = Q.defer();
		
		db.models.Credential.find({
			where: { email: credentials.email, password: credentials.password }
		})
		// Success
		.then( deferred.resolve )
		// Error
		.catch( deferred.reject );

		return deferred.promise;	
	}

	return People;
}
