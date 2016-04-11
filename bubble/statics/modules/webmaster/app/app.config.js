(function (ang) {
	
	var app = ang.module('app');

	app.config(function ($resourcesProvider, $stateProvider, $urlRouterProvider) {

		// Resources
			$resourcesProvider.init({
				resources: {

					Config: {
						route: '/system/api/config'
					},

					Logout: {
						route: '/auth/v1/logout'
					}
				}
			});			

		// Router
		
			$urlRouterProvider.otherwise("/");
			$stateProvider
				.state('basics', {
					url: '/basics',
					template: '<div class="cover" ui-view></div>'
				})
					.state('basics.configuration', {
						url: '/configuration',
						templateUrl: '/statics/modules/webmaster/basics/config.html',
						controller: 'basicsConfigController'
					})
		

	});


})(angular);