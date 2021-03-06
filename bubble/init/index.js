module.exports = function ($config, $app, $express, $interfaces) {

	// Agents
		var SystemManager = $interfaces.agents('SystemManager');

	// Set views engine
		$app.set('view engine', 'jade');

	// Set parsers
		$app.use( $interfaces.libs('bodyParser').json() );
		$app.use( $interfaces.libs('bodyParser').urlencoded({ extended: true }) );
		$app.use( $interfaces.libs('cookieParser')() );

	// Logging
		$app.use( $interfaces.libs('morgan')('dev') );

	// Compress all requests
		$app.use( $interfaces.libs('compress')() );

	// Bower components
		$app.use('*/libs', $express.static('bower_components'));

	// Statics
		var staticsPath = $interfaces.libs('path').join(__dirname, '..', 'statics');
		$app.use('/statics', $express.static(staticsPath));

	// Set Access Control
		$app.use(function (req, res, next) {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
			res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
			if ('OPTIONS' == req.method) res.send(200);
			else next();
		});

	// Initialize webmaster
		SystemManager.Init.startWebmaster().catch(function (error) {
			console.error('Error creating webmaster', error);
		});

}