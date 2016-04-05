module.exports = function ($express, $app, $interfaces ) {

	// Controllers dependencies
		var $ = {};
		$.interfaces = $interfaces;

	// Routes
		var viewsRouter = $express.Router();
		var authRouter = $express.Router();
		var apiRouter = $express.Router();

	// Controllers
		/*var Middleware = require('./Middleware')($);
		var Views = require('./Views')($);
		var Auth = require('./Auth')($);
		var API = require('./API')($);*/

	// Middleware
		/*authRouter.all('/*', Middleware.startRequest );
		authRouter.all('/*', Auth.Access.getCurrentSession );
		apiRouter.all('/*', Middleware.startRequest );
		apiRouter.all('/*', Auth.Access.getCurrentSession );
		viewsRouter.all('/*', Auth.Access.getCurrentSession );*/

	// Auth
		/*authRouter.post('/webmaster/login', Auth.WebmasterAccess.login);
		authRouter.delete('/webmaster/logout', Auth.WebmasterAccess.logout);
		authRouter.post('/register', Auth.Access.register);
		authRouter.post('/login', Auth.Access.login);*/

	// API
		/*apiRouter.get('/server-error/:errorId', API.Logs.getServerErrorDetails);
		apiRouter.get('/users', API.Users.getAll);*/

	// Views
		/*viewsRouter.get('/wmaster', Auth.WebmasterAccess.verifySession, Views.webmaster );
		viewsRouter.get('/register', Auth.Access.redirectIfAlreadyLoggedIn('/'), Views.register );
		viewsRouter.get('/login', Auth.Access.redirectIfAlreadyLoggedIn('/'), Views.login );*/
		// viewsRouter.get('/app', Auth.Access.redirectIfNotLoggedIn('/login'), Views.admin );

	// Set routers
		$app.use( '/', viewsRouter );
		$app.use( '/auth/v1', authRouter );
		$app.use( '/api/v1', apiRouter );

}