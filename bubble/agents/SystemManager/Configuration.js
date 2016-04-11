module.exports = function (SystemManager, $) {
	var Q = $.interfaces.libs('Q');
	var db = $.interfaces.databases('sequelize');
	var Configuration = {};

	Configuration.update = function (data) {
		var deferred = Q.defer();
		db.models.Configuration.findOrCreate({
			where: {
				sys: true
			}
		})
		// Success
		.then(function (configuration) {
			configuration = configuration[0];
			Object.keys(data).forEach(function (attr) {
				configuration[attr] = data[attr];
			});
			configuration.save()
			// Success
			.then( deferred.resolve )
			// Error
			.catch( deferred.reject );
		})
		// Error
		.catch( deferred.reject );

		return deferred.promise;
	}

	Configuration.get = function () {
		var deferred = Q.defer();
		db.models.Configuration.findOne({
			where: {
				sys: true
			}
		})
		// Success
		.then( deferred.resolve )
		// Error
		.catch( deferred.reject );

		return deferred.promise;
	}

	return Configuration;
}