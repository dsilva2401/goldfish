module.exports = function ($config, $app, $express, $interfaces, $parent) {

	// Statics
	var staticsPath = $parent.interfaces.libs('path').join(__dirname, '..', 'statics');
	$app.use('/statics', $express.static(staticsPath));

}