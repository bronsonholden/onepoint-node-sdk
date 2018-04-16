const async = require('async');
const OnePoint = require('../index');
const env = require('./env.js');

async.waterfall([
	(callback) => {
		callback(null, new OnePoint(env));
	},
	(onePoint, callback) => {
		onePoint.connect((err) => {
			if (err) {
				return callback(err);
			}

			callback(null, onePoint);
		});
	},
	(onePoint, callback) => {
		onePoint.listReports((err, data) => {
			callback(err, onePoint, data);
		});
	},
	(onePoint, reports, callback) => {
		callback(null, onePoint);
	}
], (err, onePoint) => {
	if (err) {
		console.log(err);
	}

	onePoint.close(() => {
		process.exit(0);
	});
});
