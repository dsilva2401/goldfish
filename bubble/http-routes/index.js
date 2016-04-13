module.exports = function ($express, $app, $interfaces ) {

	// Controllers dependencies
		var $ = {};
		$.interfaces = $interfaces;

	// Routes
		var viewsRouter = $express.Router();
		var systemRouter = $express.Router();

	// Controllers
		var Views = require('./Views')($);
		var System = require('./System')($);

	// Middleware
		// authRouter.all('/*', Auth.Access.getCurrentSession );

	// System
		systemRouter.put('/config', System.updateConfig);
		systemRouter.get('/config', System.getConfig);

	// Views
		viewsRouter.get('/wmaster', Views.webmaster );
		viewsRouter.get('/register', Views.register );

	// Set routers
		$app.use( '/', viewsRouter );
		$app.use( '/system/api', systemRouter );

}