const async = require('async');
const _ = require('lodash');
const hostname = require('./hostname');

module.exports = function (report, callback) {
	switch (typeof(report)) {
	case 'object':
		if (_.has(report, 'where')) {
			return this.getReport(report, (err, reports) => {
				if (err) {
					return callback(err);
				}

				this.runReport(reports, callback);
			});
		} else if (_.has(report, 'settingsId')) {
			var params = {
				method: 'GET',
				baseUrl: hostname(1),
				uri: `/report/saved/${report.settingsId}`,
				headers: {
					'Accept': 'text/csv',
					'Authentication': `bearer ${this.accessToken}`
				},
				qs: {
					company: this.companyShortName
				}
			};

			return this.enqueueRequest(params, 1, (err, data) => {
				if (err) {
					return callback(err);
				}

				callback(null, _.merge(report, {
					results: data
				}));
			});
		}
	case 'array':
		return async.mapSeries(report, (r, callback) => {
			this.runReport(r, callback);
		}, (err, results) => {
			if (err) {
				return callback(err);
			}

			callback(null, results);
		})
		break;
	default:
		break;
	}

	setImmediate(() => {
		callback(null, new Error('Invalid report'));
	});
}
