module.exports = function ($) {

	return function (libName) {
		if (!$.libs[libName]) {
			$.logger('Error: Lib \''+libName+'\' not found');
			return;
		}
		return $.libs[libName];
	}

}