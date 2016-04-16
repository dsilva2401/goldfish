module.exports = function ($express, $app, $interfaces ) {

	// Controllers dependencies
		var $ = {};
		$.interfaces = $interfaces;

	// Routes
		var viewsRouter = $express.Router();
		var systemRouter = $express.Router();
		var accessRouter = $express.Router();
		var appRouter = $express.Router();

	// Controllers
		var Views = require('./Views')($);
		var System = require('./System')($);
		var Access = require('./Access')($);

	// System
		systemRouter.put('/config', System.updateConfig);
		systemRouter.get('/config', System.getConfig);

	// Views
		viewsRouter.get('/wmaster', Views.webmaster);
		viewsRouter.get('/register', Views.register);

	// Access
		accessRouter.post('/register', Access.register);

	// Set routers
		$app.use('/', viewsRouter);
		$app.use('/system/api', systemRouter);
		$app.use('/access/api', accessRouter);
		$app.use('/app/api', appRouter);

}