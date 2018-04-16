const OnePoint = require('../index');
const env = require('./env.js');

async.waterfall([
	(callback) => {
		callback(null, new OnePoint(env));
	},
	(onePoint, callback) => {
		onePoint.connect((err) => {
			callback(err, onePoint);
		});
	},
], (err, onePoint) => {
	if (err) {
		console.log(err);
	}

	onePoint.close(() => {
		process.exit(0);
	});
});
