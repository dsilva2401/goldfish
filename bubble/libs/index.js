module.exports = function ($libs) {

	$libs.fs = require('fs');
	$libs.path = require('path');
	$libs.sequelize = require('sequelize');
	$libs.cookieParser = require('cookie-parser');
	$libs.bodyParser = require('body-parser');
	$libs.methodOverride = require('method-override');
	$libs.compress = require('compression');
	$libs.morgan = require('morgan');
	$libs.Q = require('q');
	$libs.md5 = require('md5');

}
