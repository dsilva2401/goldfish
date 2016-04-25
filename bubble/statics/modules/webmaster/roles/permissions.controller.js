(function (ang) {
	
	var app = ang.module('app');

	app.controller('rolesPermissionsController', function ($scope, $http, $state, $resources, $window) {
		$scope.methods = $scope.methods || {};
		$scope.models = $scope.models || {};

		// Methods
			$scope.methods.loadRoles = function () {
				$resources.Roles.get()
				// Success
				.then(function (resp) {
					$scope.models.roles = resp.data;
					$scope.models.permissions = {};
					resp.data.forEach(function (role) {
						$scope.models.permissions[role.id] = {}
					});
					console.log('Roles loaded', resp);
				})
				// Error
				.catch(function (resp) {
					console.warn('Error loading roles', resp);
				})
			}
			$scope.methods.loadAppViews = function () {
				$resources.AppViews.get()
				// Success
				.then(function (resp) {
					$scope.models.childs.push({
						childName: 'root',
						views: resp.data
					})
					var intval = setInterval(function () {
						if ($scope.models.permissions) {
							clearInterval(intval);
							Object.keys($scope.models.permissions).forEach(function (roleId) {
								resp.data.forEach(function (view) {
									$scope.models.permissions[roleId][view.name] = $scope.models.permissions[roleId][view.name] || false;
								});
							});
							$scope.$apply();
						}
					}, 100);
					console.log('App views loaded', resp);
				})
				// Error
				.catch(function (resp) {
					console.warn('Error loading views', resp);
				})
			}
			$scope.methods.loadChilds = function () {
				$resources.AppChilds.get()
				// Success
				.then(function (resp) {
					resp.data.forEach(function (child) {
						$scope.methods.loadChildViews(child.name);
					})
					console.log('App Childs loaded', resp);
				})
				// Error
				.catch(function (resp) {
					console.warn('Error loading app childs', resp);
				})
			}
			$scope.methods.loadChildViews = function (childName) {
				$resources.AppChildViews.get({
					urlParams: { childName: childName }
				})
				// Success
				.then(function (resp) {
					$scope.models.childs.push({
						childName: childName,
						views: resp.data
					});
					var intval = setInterval(function () {
						if ($scope.models.permissions) {
							clearInterval(intval);
							Object.keys($scope.models.permissions).forEach(function (roleId) {
								resp.data.forEach(function (view) {
									$scope.models.permissions[roleId][view.name] = $scope.models.permissions[roleId][view.name] || false;
								});
							});
							$scope.$apply();
						}
					}, 100);
					console.log(childName+' views loaded', resp);
				})
				// Error
				.catch(function (resp) {
					console.warn('Error loading views', resp);
				})
			}
			$scope.methods.updatePermission = function (roleId, viewName) {
				$resources.RolePermission.put({
					urlParams: { roleId: roleId },
					data: {
						viewName: viewName,
						status: $scope.models.permissions[roleId][viewName]
					}
				})
				// Success
				.then(function (resp) {
					console.log('Role permission updated', resp);
				})
				// Error
				.catch(function (resp) {
					console.warn('Error updating role permission', resp);
				})
			}
			$scope.methods.loadRolesPermissions = function () {
				$resources.RolesPermissions.get()
				// Success
				.then(function (resp) {
					console.log('Roles permissions loaded', resp);
					var intval = setInterval(function () {
						if ($scope.models.permissions) {
							clearInterval(intval);
							resp.data.forEach(function (rolePermission) {
								$scope.models.permissions[rolePermission.RoleId][rolePermission.viewName] = rolePermission.status;
							})
							$scope.$apply();
						}
					}, 100);
				})
				// Error
				.catch(function (resp) {
					console.warn('Error loading roles permissions', resp);
				});
			}

		// Init
			$scope.models.childs = [];
			$scope.methods.loadRoles();
			$scope.methods.loadChilds();
			$scope.methods.loadAppViews();
			$scope.methods.loadRolesPermissions();


	});

})(angular);