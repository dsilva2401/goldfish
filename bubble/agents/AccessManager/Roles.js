module.exports = function (AccessManager, $) {
	var Q = $.interfaces.libs('Q');
	var db = $.interfaces.databases('sequelize');
	var Roles = {};

	Roles.updatePermission = function (roleId, viewName, status) {
		var deferred = Q.defer();
		db.models.RolePermission.findOrCreate({
			where: {
				viewName: viewName,
				RoleId: roleId
			}
		})
		// Success
		.then(function (rolePermission) {
			rolePermission = rolePermission[0];
			rolePermission.status = status;
			rolePermission.save()
			// Success
			.then(function (rolePermission) {
				deferred.resolve(rolePermission);
			})
			// Error
			.catch(function (error) {
				deferred.reject(error);
			});
		})
		// Error
		.catch(function (error) {
			deferred.reject(error);
		});
		return deferred.promise;
	}

	Roles.getPermissions = function () {
		var deferred = Q.defer();
		db.models.RolePermission.findAll()
		// Success
		.then(function (rolesPermissions) {
			deferred.resolve(rolesPermissions);
		})
		// Error
		.catch(function (error) {
			deferred.reject(error);
		});
		return deferred.promise;
	}

	return Roles;
}
