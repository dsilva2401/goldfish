module.exports = function (SystemManager, $) {
	var Q = $.interfaces.libs('Q');
	var md5 = $.interfaces.libs('md5');
	var db = $.interfaces.databases('sequelize');
	var Init = {};

	Init.createWebMaster = function () {
		var deferred = Q.defer();
		db.models.Person.findOrCreate({
			where: {
				name: 'Admin',
				email: 'admin',
				hidden: true
			}
		})
		// Success
		.then(function (wmasterPerson) {
			wmasterPerson = wmasterPerson[0];
			db.models.Credential.findOrCreate({
				where: {
					email: 'admin',
					password: md5('password'),
					PersonId: wmasterPerson.dataValues.id
				}
			})
			// Success
			.then(function (credential) {
				deferred.resolve(wmasterPerson);
			})
			// Error
			.catch(function (error) {
				deferred.reject(error);
			})
		})
		// Error
		.catch(function (error) {
			deferred.reject(error);
		})
		return deferred.promise;
	}

	Init.createWMasterRole = function () {
		var deferred = Q.defer();
		db.models.Role.findOrCreate({
			where: {
				name: 'Webmaster',
				identifier: 'wmaster',
				hidden: true
			}
		})
		// Success
		.then(function (role) {
			role = role[0];
			deferred.resolve(role);
		})
		// Error
		.catch(function (error) {
			deferred.reject(error);
		});
		return deferred.promise;
	}

	Init.givePermissions = function (roleId) {
		var deferred = Q.defer();
		var bubbleRouter =  $.interfaces.agents('HTTPManager').BubbleRouter;
		var childs = bubbleRouter.getChilds();
		childs.push({ name: '' });
		childs.forEach(function (child) {
			bubbleRouter.getViews(child.name)
			// Success
			.then(function (views) {
				var createPermission = function (viewIndex) {
					if (viewIndex >= views.length) return;
					db.models.RolePermission.findOrCreate({
						where: {
							RoleId: roleId,
							viewName: views[viewIndex].name
						}
					}).then(function (rolePermission) {
						rolePermission = rolePermission[0];
						rolePermission.status = true;
						rolePermission.save()
						.then(function () {
							createPermission(viewIndex+1);
						})
						.catch(function (error) {
							deferred.reject(error);
						});
					}).catch(function (error) {
						deferred.reject(error);
					})
				}
				createPermission(0);
			})
			// Error
			.catch(function (error) {
				deferred.reject(error);
			})
		})
		return deferred.promise;
	}

	Init.startWebmaster = function () {
		var deferred = Q.defer();
		Init.createWebMaster()
		// Success
		.then(function (wmasterPerson) {
			Init.createWMasterRole()
			// Success
			.then(function (role) {
				Init.givePermissions(role.id)
				// Error
				.catch(function (error) {
					deferred.reject(error);
				});
			})
			// Error
			.catch(function (error) {
				deferred.reject(error);
			})
		})
		// Error
		.catch(function (error) {
			deferred.reject(error);
		});
		return deferred.promise;
	}

	return Init;
}