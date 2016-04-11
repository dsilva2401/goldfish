module.exports = function ($) {

	return function (agentName) {
		if (!$.agents[agentName]) {
			$.logger('Error: Agent \''+agentName+'\' not found');
			return;
		}
		return $.agents[agentName];
	}

}