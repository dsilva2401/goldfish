module.exports = function ($) {
	var Path = $.interfaces.libs('path');
	var Views = {};

	Views.webmaster = function (req, res, next) {
		res.sendFile(
			Path.join(__dirname,'../../statics/modules/webmaster/index.html')
		);
	}

	Views.register = function (req, res, next) {
		res.sendFile(
			Path.join(__dirname,'../../statics/modules/register/index.html')
		);
	}

	return Views;
}