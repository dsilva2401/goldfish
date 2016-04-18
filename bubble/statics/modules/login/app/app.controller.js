(function (ang) {
	
	var app = ang.module('app');

	app.controller('appController', function ($scope, $http, $resources, $window) {
		$scope.methods = $scope.methods || {};
		$scope.models = $scope.models || {};

		// Methods
			$scope.methods.submit = function () {
				$resources.Login.post({
					data: {
						email: $scope.models.email,
						password: $scope.models.password
					}
				})
				// Success
				.then(function (resp) {
					$window.location.reload();
				})
				// Error
				.catch(function (resp) {
					console.warn('Error on login', resp);
				})
			}
		
		// Init

	});

})(angular);