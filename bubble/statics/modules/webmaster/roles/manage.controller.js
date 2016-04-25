(function (ang) {
	
	var app = ang.module('app');

	app.controller('rolesManageController', function ($scope, $http, $state, $resources, $window) {
		$scope.methods = $scope.methods || {};
		$scope.models = $scope.models || {};

		// Methods
			$scope.methods.loadRoles = function () {
				$resources.Roles.get()
				// Success
				.then(function (resp) {
					$scope.models.roles = resp.data;
					console.log('Roles loaded', resp);
				})
				// Error
				.catch(function (resp) {
					console.warn('Error loading roles', resp);
				})
			}
			$scope.methods.focusRoleToModify = function (role) {
				$scope.models.currentRoleId = role.id;
				$scope.models.currentRoleName = role.name;
				$scope.models.currentRoleIdentifier = role.identifier;
			}
			$scope.methods.blurRoleToModify = function () {
				$scope.models.currentRoleId = '';
				$scope.models.currentRoleName = '';
				$scope.models.currentRoleIdentifier = '';
			}
			$scope.methods.createRole = function () {
				$resources.Roles.post({
					data: {
						name: $scope.models.roleName,
						identifier: $scope.models.roleIdentifier
					}
				})
				// Success
				.then(function (resp) {
					console.log('Role created', resp);
					$scope.methods.loadRoles();
					$scope.methods.toggleCreateRoleForm();
				})
				// Error
				.catch(function (resp) {
					console.warn('Error creating role', resp);
				});
			}
			$scope.methods.resetRoleForm = function () {
				$scope.models.roleName = '';
				$scope.models.roleIdentifier = '';
			}
			$scope.methods.toggleCreateRoleForm = function () {
				$scope.models.showRoleForm = !$scope.models.showRoleForm;
				$scope.methods.resetRoleForm();
			}
			$scope.methods.modifyRole = function () {
				$resources.Roles.put({
					urlParams: { roleId: $scope.models.currentRoleId },
					data: {
						name: $scope.models.currentRoleName,
						identifier: $scope.models.currentRoleIdentifier
					}
				})
				// Success
				.then(function (resp) {
					console.log('Role updated', resp);
					$scope.methods.loadRoles();
					$scope.methods.blurRoleToModify();
				})
				// Error
				.catch(function (resp) {
					console.warn('Error updating role', resp);
				});
			}
			$scope.methods.deleteRole = function (r) {
				if (!confirm('Delete \''+r.name+'\' role?')) return;
				$resources.Roles.delete({
					urlParams: { roleId: r.id }
				})
				// Success
				.then(function (resp) {
					console.log('Role deleted', resp);
					$scope.methods.loadRoles();
				})
				// Error
				.catch(function (resp) {
					console.warn('Error deleting role', resp);
				});
			}

		// Init
			$scope.methods.loadRoles();
			$scope.models.showRoleForm = false;

	});

})(angular);