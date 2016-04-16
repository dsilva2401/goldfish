module.exports = function (HTTPManager, $) {
	return function (req, res, next) {
		var r = {};

		r.success = function (data) {
			// Log.successResponse(req, res);
			res.status(200);
			res.json(data);
			res.end();
		}

		r.error = function (err) {
			var eType;
			if (res.statusCode == 200) res.status(500);
			res.json({
				error: err 
			});
			res.end();
		}

		return r;
	}
}