(function (ang) {
	
	var app = ang.module('app');

	app.controller('basicsConfigController', function ($scope, $http, $state, $resources, $window) {
		$scope.methods = $scope.methods || {};
		$scope.models = $scope.models || {};

		// Methods
			$scope.methods.getConfig = function (config) {
				$resources.Config.get()
				// Success
				.then(function (resp) {
					$scope.models.config = (resp.data || {});
					console.log('Configuration loaded', resp);
				})
				// Error
				.catch(function (resp) {
					console.warn('Error loading configuration', resp);
				});
			}

			$scope.methods.updateConfig = function (config) {
				$resources.Config.put({
					data: config
				})
				// Success
				.then(function (resp) {
					console.log('Configuration system updated', resp);
				})
				// Error
				.catch(function (resp) {
					console.warn('Error configurating system', resp);
				});
			} 		
		
		// Init
			$scope.methods.getConfig();

	});

})(angular);