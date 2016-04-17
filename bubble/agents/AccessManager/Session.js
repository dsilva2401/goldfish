module.exports = function (AccessManager, $) {
	var Q = $.interfaces.libs('Q');
	var db = $.interfaces.databases('sequelize');
	var Session = {};

	/*Session.create = function (personData) {
		var deferred = Q.defer();
		
		db.models.Person.create(personData)
		// Success
		.then( deferred.resolve )
		// Error
		.catch( deferred.reject );

		return deferred.promise;
	}*/

	return Session;
}