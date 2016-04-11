(function (ang) {
	
	var app = ang.module('app');

	app.config(function ($resourcesProvider, $stateProvider, $urlRouterProvider) {

		// Resources
			$resourcesProvider.init({
				resources: {

					Users: {
						route: '/api/v1/users/:userId?:query'
					},

					Logout: {
						route: '/auth/v1/logout'
					}
				}
			});			

		// Router
		/*
			$urlRouterProvider.otherwise("/");
			$stateProvider
				.state('users', {
					url: '/users',
					template: '<div class="cover" ui-view></div>'
				})
					.state('users.registered', {
						url: '/registered',
						templateUrl: '/statics/modules/admin/users/registered.html',
						controller: 'usersRegisteredController'
					})
		*/

	});


})(angular);