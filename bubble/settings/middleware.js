module.exports = function ($) {

	// Set parsers
	$.app.use( $.interfaces.libs('bodyParser').json() );
	$.app.use( $.interfaces.libs('bodyParser').urlencoded({ extended: true }) );
	$.app.use( $.interfaces.libs('cookieParser')() );

	// Logging
	$.app.use( $.interfaces.libs('morgan')('dev') );

	// Compress all requests
	$.app.use( $.interfaces.libs('compress')() );

	// Bower components
	$.app.use('/bower_components', $.express.static('bower_components'));

	// Set Access Control
	$.app.use(function (req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
		if ('OPTIONS' == req.method) res.send(200);
		else next();
	});

}