module.exports = function ($express, $app, $interfaces, $parent ) {

		// Agents
		var HTTPManager = $parent.interfaces.agents('HTTPManager');

	// Bubble Router
		var bubbleRouter = HTTPManager.BubbleRouter.new('bubbleName');

	// Controllers dependencies
		var $ = {};
		$.parent = $parent;

	// Routes
		var middleRouter = bubbleRouter.createRouter('middleRouter');
		var viewsRouter = bubbleRouter.createRouter('viewsRouter');
		var appRouter = bubbleRouter.createRouter('appRouter');

	// Controllers
		// var Views = require('./Views')($);

	// Middleware
		/*middleRouter.all('beforeAll', '/*',
			Access.getSession);*/

	// Views
		/*viewsRouter.get('xView', '/',
			Access.redirectIfNotSession('/login'), Views.webmaster);
		*/
		viewsRouter.get('happyView', '/',
			function (req, res, next) {
				res.end(':D');
			});


	// Set routers
		$app.use('/', middleRouter.router);
		$app.use('/', viewsRouter.router);
		$app.use('/app/api', appRouter.router);

}