(function (ang) {
	
	var app = ang.module('app');

	app.controller('appController', function ($scope, $http, $resources, $window) {
		$scope.methods = $scope.methods || {};
		$scope.models = $scope.models || {};

		// Methods
			$scope.methods.submit = function () {
				if ($scope.models.password != $scope.models.repassword) {
					$scope.models.invalidPassword = true;
					return;
				}
				$resources.Register.post({
					data: {
						name: $scope.models.name,
						lastname: $scope.models.lastname,
						email: $scope.models.email,
						phone: $scope.models.phone,
						sex: $scope.models.sex,
						password: $scope.models.password
					}
				})
				// Success
				.then(function (resp) {
					console.log(resp);
					$window.location.reload();
				})
				// Error
				.catch(function (resp) {
					console.warn('Error on register', resp);
				})
			}
		
		// Init

	});

})(angular);