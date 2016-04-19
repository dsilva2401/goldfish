module.exports = function ($) {

	return function (databaseName) {
		if (!$.databases[databaseName]) {
			$.logger('Error: Database \''+databaseName+'\' not found');
			return;
		}
		return $.databases[databaseName];
	}

}