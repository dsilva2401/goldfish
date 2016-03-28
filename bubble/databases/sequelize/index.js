module.exports = function ($) {

	// Database configuration
		var dbConfig = $.config.databases.sequelize;

	// Sequelize
		var Sequelize = $.interfaces.libs('sequelize');

	// Create database
		var db = new Sequelize(
			dbConfig.database,
			dbConfig.username,
			dbConfig.password,
			dbConfig.options
		);

	// Setup models
		require('./models')(db, Sequelize);

	// Sync database
		db.sync();

	// Export database
		return db;

}