module.exports = function ($express, $app, $interfaces ) {

	// Controllers dependencies
		var $ = {};
		$.interfaces = $interfaces;

	// Routes
		var viewsRouter = $express.Router();
		var apiRouter = $express.Router();

	// Controllers
		/*var Views = require('./Views')($);
		var API = require('./API')($);*/

	// Middleware
		
	// API
		/*apiRouter.get('/server-error/:errorId', API.Logs.getServerErrorDetails);
		apiRouter.get('/users', API.Users.getAll);*/

	// Views
		/*viewsRouter.get('/wmaster', Auth.WebmasterAccess.verifySession, Views.webmaster );
		viewsRouter.get('/register', Auth.Access.redirectIfAlreadyLoggedIn('/'), Views.register );
		viewsRouter.get('/login', Auth.Access.redirectIfAlreadyLoggedIn('/'), Views.login );*/
		// viewsRouter.get('/app', Auth.Access.redirectIfNotLoggedIn('/login'), Views.admin );
		viewsRouter.get('/', function (req, res, next) {
			res.end(':DDD');
		})
		viewsRouter.get('/test', function (req, res, next) {
			res.end('Test :|');
		})

	// Set routers
		$app.use( '/', viewsRouter );
		$app.use( '/api/v1', apiRouter );

}