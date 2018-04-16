const hostname = require('./hostname');
const _ = require('lodash');

module.exports = function (callback) {
	var params = {
		method: 'GET',
		baseUrl: hostname(1),
		uri: '/reports',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authentication': `bearer ${this.accessToken}`
		},
		qs: {
			type: 'Saved',
			company: this.companyShortName
		}
	};

	this.enqueueRequest(params, 1, (err, data) => {
		if (err) {
			return callback(err);
		}

		callback(null, data);
	});
}
