module.exports = function ($express, $app, $interfaces ) {

	// Agents
		var HTTPManager = $interfaces.agents('HTTPManager');

	// Bubble Router
		var bubbleRouter = HTTPManager.BubbleRouter.new();

	// Controllers dependencies
		var $ = {};
		$.interfaces = $interfaces;

	// Routes
		var middleRouter = bubbleRouter.createRouter('middleRouter');
		var viewsRouter = bubbleRouter.createRouter('viewsRouter');
		var systemRouter = bubbleRouter.createRouter('systemRouter');
		var accessRouter = bubbleRouter.createRouter('accessRouter');
		var appRouter = bubbleRouter.createRouter('appRouter');

	// Controllers
		var Views = require('./Views')($);
		var System = require('./System')($);
		var Access = require('./Access')($);

	// Middleware
		middleRouter.all('beforeAll', '/*',
			Access.getSession);

	// System
		systemRouter.put('updateConfig', '/config',
			System.updateConfig);
		systemRouter.get('getConfig', '/config',
			System.getConfig);

	// Views
		viewsRouter.get('webmasterView', '/wmaster',
			Access.redirectIfNotSession('/login'), Views.webmaster);
		viewsRouter.get('registerView', '/register',
			Access.redirectIfSession('/'), Views.register);
		viewsRouter.get('loginView', '/login',
			Access.redirectIfSession('/'), Views.login);

	// Access
		accessRouter.post('submitRegister', '/register',
			Access.register);
		accessRouter.post('submitCredentials', '/login',
			Access.login);

	// Set routers
		$app.use('/', middleRouter.router);
		$app.use('/', viewsRouter.router);
		$app.use('/system/api', systemRouter.router);
		$app.use('/access/api', accessRouter.router);
		$app.use('/app/api', appRouter.router);

}