(function (ang) {
	
	var app = ang.module('app');

	app.config(function ($resourcesProvider, $stateProvider, $urlRouterProvider) {

		// Resources
			$resourcesProvider.init({
				resources: {

					RolesPermissions: {
						route: '/access/api/roles/permissions'
					},

					RolePermission: {
						route: '/access/api/roles/:roleId/permissions'
					},

					AppChilds: {
						route: '/system/api/childs'
					},

					AppViews: {
						route: '/system/api/views'
					},

					AppChildViews: {
						route: '/system/api/childs/:childName/views'
					},

					Roles: {
						route: '/access/api/roles/:roleId'
					},

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
				.state('roles', {
					url: '/roles',
					template: '<div class="cover" ui-view></div>'
				})
					.state('roles.manage', {
						url: '/manage',
						templateUrl: '/statics/modules/webmaster/roles/manage.html',
						controller: 'rolesManageController'
					})
					.state('roles.permissions', {
						url: '/permissions',
						templateUrl: '/statics/modules/webmaster/roles/permissions.html',
						controller: 'rolesPermissionsController'
					})
				.state('people', {
					url: '/people',
					template: '<div class="cover" ui-view></div>'
				})
					.state('people.list', {
						url: '/list',
						templateUrl: '/statics/modules/webmaster/people/list.html',
						// controller: 'rolesManageController'
					})
		

	});


})(angular);