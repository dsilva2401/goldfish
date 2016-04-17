(function (ang) {
	
	var app = ang.module('app');

	app.config(function ($resourcesProvider, $stateProvider, $urlRouterProvider) {

		// Resources
			$resourcesProvider.init({
				resources: {

					Register: {
						route: '/auth/v1/register'
					}
				}
			});

		// Router
			// $urlRouterProvider.otherwise("/");
			$stateProvider
				.state('stateX', {
					url: '/state-x',
					template: 'State X',
				})


	});


})(angular);