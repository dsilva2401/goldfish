module.exports = function ($express, $app, $interfaces ) {

	// Controllers dependencies
		var $ = {};
		$.interfaces = $interfaces;

	// Routes
		var middleRouter = $express.Router();
		var viewsRouter = $express.Router();
		var systemRouter = $express.Router();
		var accessRouter = $express.Router();
		var appRouter = $express.Router();

	// Controllers
		var Views = require('./Views')($);
		var System = require('./System')($);
		var Access = require('./Access')($);

	// Middleware
		middleRouter.all('/*', Access.getSession);

	// System
		systemRouter.put('/config', System.updateConfig);
		systemRouter.get('/config', System.getConfig);

	// Views
		viewsRouter.get('/wmaster', Access.redirectIfNotSession('/login'), Views.webmaster);
		viewsRouter.get('/register', Access.redirectIfSession('/'), Views.register);
		viewsRouter.get('/login', Access.redirectIfSession('/'), Views.login);

	// Access
		accessRouter.post('/register', Access.register);
		accessRouter.post('/login', Access.login);

	// Set routers
		$app.use('/', middleRouter);
		$app.use('/', viewsRouter);
		$app.use('/system/api', systemRouter);
		$app.use('/access/api', accessRouter);
		$app.use('/app/api', appRouter);

}