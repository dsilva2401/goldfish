module.exports = function ($) {

	return function (databaseName) {
		if (!$.libs[databaseName]) {
			$.logger('Error: Database \''+databaseName+'\' not found');
			return;
		}
		return $.libs[databaseName];
	}

}