const _ = require('lodash');

module.exports = function (options, callback) {
	if (!_.has(options, 'where')) {
		return this.listReports(callback);
	}

	var where = _.get(options, 'where');

	this.listReports((err, reports) => {
		callback(err, _.filter(reports, where));
	});
}
