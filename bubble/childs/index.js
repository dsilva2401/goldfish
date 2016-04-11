module.exports = function (parentBubble) {
	var fs = require('fs');
	var childs = {};

	fs.readdirSync(__dirname).filter(function (dir) {
		return (dir != 'index.js');
	}).forEach(function (child) {
		childs[child] = require('./'+child)(parentBubble);
	});

	return childs;
}