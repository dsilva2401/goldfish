(function (ang) {
	
	var app = ang.module('app');

	app.controller('appController', function ($scope, $http, $state, $resources, $window) {
		$scope.methods = $scope.methods || {};
		$scope.models = $scope.models || {};

		// Methods
			$scope.methods.setModules = function () {
				$scope.models.modules = [{
					name: 'Basics',
					submodules: [{
						name: 'Configuration',
						state: 'basics.configuration'
					}]
				}, {
					name: 'Roles',
					submodules: [{
						name: 'Manage',
						state: 'roles.manage'
					},{
						name: 'Permissions',
						state: 'roles.permissions'
					}]
				}, {
					name: 'People',
					submodules: [{
						name: 'List',
						state: 'people.list'
					}]
				}]
			}
			$scope.methods.goToSubModule = function (state) {
				$state.go(state);
			}
			$scope.methods.logout = function () {
				$resources.Logout.delete().then(function (resp) {
					$window.location.reload();
				})
			}
		
		
		// Init
			$scope.methods.setModules();

	});

})(angular);