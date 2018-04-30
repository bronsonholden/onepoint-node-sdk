const async = require('async');
const _ = require('lodash');

function OnePoint(config) {
  var self = this;

  self.username = config.username;
  self.password = config.password;
  self.apiKey = config.apiKey;
  self.companyShortName = config.companyShortName;
  self.accessToken = null;
  self.closing = false;
  self.callThreshold = null;
  self.currentCalls = null;

  var queue = async.priorityQueue((task, callback) => {
    if (task.request) {
      return self.sendRequest(task.request, (err, res, data) => {
        if (err) {
          return callback(err);
        }

        var threshold = parseInt(_.get(res, [ 'headers', 'x-calllimit-threshold' ]));
        var currentCalls = parseInt(_.get(res, [ 'headers', 'x-calllimit-currentcalls' ]));

        if (threshold && currentCalls) {
          self.currentCalls = currentCalls;
          self.callThreshold = threshold;
        }

        callback(null, data);
      });
    } else if (task.idle) {
      return setTimeout(callback, task.idle);
    }

    callback(new Error('Invalid task'));
  });

  self.queue = queue;
}

OnePoint.prototype.connect = require('./connect');
OnePoint.prototype.close = require('./close');
OnePoint.prototype.enqueueRequest = require('./enqueue-request');
OnePoint.prototype.sendRequest = require('./send-request');
OnePoint.prototype.getRateLimit = require('./get-rate-limit');
OnePoint.prototype.listReports = require('./list-reports');
OnePoint.prototype.getReport = require('./get-report');
OnePoint.prototype.runReport = require('./run-report');

module.exports = OnePoint;
