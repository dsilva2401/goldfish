module.exports = function ($) {
	var httpTransporters = {};

	httpTransporters.Views = require('./Views')($);

	return httpTransporters;
}