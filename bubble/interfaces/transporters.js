module.exports = function ($) {

	return function (transporter) {
		if (!$.transporters[transporter]) {
			$.logger('Error: Transporter \''+transporter+'\' not found');
			return;
		}
		return $.transporters[transporter];
	}

}