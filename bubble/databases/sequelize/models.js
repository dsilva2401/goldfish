module.exports = function (db, DataTypes) {

	// System ---
		var Configuration = db.define('Configuration', {
			sys: DataTypes.BOOLEAN,
			inviteOnly: DataTypes.BOOLEAN
		});
	// ---

	// People ---
		var Person = db.define('Person', {
			name: DataTypes.STRING,
			lastname: DataTypes.STRING,
			email: { type: DataTypes.STRING, unique: true },
			sex: DataTypes.CHAR,
			birthday: DataTypes.DATE,
			active: { type: DataTypes.BOOLEAN, defaultValue: true }
		});

		var BasicCredential = db.define('BasicCredential', {
			email: { type: DataTypes.STRING, unique: true },
			password: DataTypes.STRING
		});

		var SessionKey = db.define('SessionKey', {
			key: { type: DataTypes.STRING, unique: true, allowNull: false }
		});
	// ---

	// Logs ---
		var SuccessResponseLog = db.define('SuccessResponseLog', {
			PersonId: DataTypes.INTEGER,
			method: DataTypes.STRING,
			url: DataTypes.STRING,
			duration: DataTypes.INTEGER,
			body: DataTypes.TEXT,
			params: DataTypes.TEXT,
			query: DataTypes.TEXT
		});

		var ClientErrorLog = db.define('ClientErrorLog', {
			PersonId: DataTypes.INTEGER,
			method: DataTypes.STRING,
			url: DataTypes.STRING,
			status: DataTypes.STRING,
			details: DataTypes.TEXT,
			duration: DataTypes.INTEGER
		});

		var ServerErrorLog = db.define('ServerErrorLog', {
			PersonId: DataTypes.INTEGER,
			method: DataTypes.STRING,
			url: DataTypes.STRING,
			duration: DataTypes.INTEGER,
			details: DataTypes.TEXT,
			query: DataTypes.TEXT,
			body: DataTypes.TEXT,
			params: DataTypes.TEXT,
			status: DataTypes.STRING
		});
	// ---


	// Relations
		BasicCredential.belongsTo( Person );
		SessionKey.belongsTo( Person );

}