(function (ang) {
	
	var app = ang.module('app');

	app.directive('appContainer', function () {
		return {
			restrict: 'EA',
			templateUrl: '/statics/modules/login/app/app.html',
			controller: 'appController'
		}
	});

})(angular)