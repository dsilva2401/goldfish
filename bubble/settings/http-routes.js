module.exports = function ($) {

	// HTTP transporters
		var HTTPTransporters = $.interfaces.transporters('http');
		var Views = HTTPTransporters.Views;

	// Set routers
		var viewsRouter = $.express.Router();
		var authRouter = $.express.Router();
		var apiRouter = $.express.Router();

	// Views
		viewsRouter.get('/', Views.home);

	// Use routers
		$.app.use( '/', viewsRouter );
		$.app.use( '/auth/v1', authRouter );
		$.app.use( '/api/v1', apiRouter );

}