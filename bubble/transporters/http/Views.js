module.exports = function ($) {
	var t = {};

	t.home = function (req, res, next) {
		res.end(':D');
	}

	return t;
}