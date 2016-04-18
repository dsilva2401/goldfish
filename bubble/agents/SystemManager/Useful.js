module.exports = function (SystemManager, $) {
	var Q = $.interfaces.libs('Q');
	var db = $.interfaces.databases('sequelize');
	var Useful = {};

	Useful.createRandomWord = function (size) {
		var f = '';
		var abc = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		for (var i=0; i<size; i++) {
			f += abc[ Math.floor( Math.random()*abc.length ) ];
		}
		return f;
	}

	return Useful;
}