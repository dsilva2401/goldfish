module.exports = function ($) {
	var Path = $.interfaces.libs('path');
	var Views = {};

	Views.webmaster = function (req, res, next) {
		res.render(
			Path.join(__dirname,'../../statics/modules/webmaster/index')
		);
	}

	Views.register = function (req, res, next) {
		res.render(
			Path.join(__dirname, '../../statics/modules/register/index')
		);
	}

	Views.login = function (req, res, next) {
		res.render(
			Path.join(__dirname, '../../statics/modules/login/index')
		);
	}

	return Views;
}