const async = require('async');

function OnePoint(config) {
	var self = this;

	self.username = config.username;
	self.password = config.password;
	self.apiKey = config.apiKey;
	self.companyShortName = config.companyShortName;
	self.accessToken = null;
	self.closing = false;

	var queue = async.priorityQueue((task, callback) => {
		if (task.request) {
			return self.sendRequest(task.request, callback);
		}

		callback(new Error('Invalid task'));
	});

	self.queue = queue;
}

OnePoint.prototype.sendRequest = require('./send-request');
OnePoint.prototype.connect = require('./connect');
OnePoint.prototype.close = require('./close');
OnePoint.prototype.enqueueRequest = require('./enqueue-request');
OnePoint.prototype.listReports = require('./list-reports');

module.exports = OnePoint;
