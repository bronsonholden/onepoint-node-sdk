const async = require('async');
const _ = require('lodash');
const csvjson = require('csvjson');
const hostname = require('./hostname');

/**
 * @memberof OnePoint
 * @instance
 * @param {(string|number)} report - The report ID or name to generate data for
 */
function runReport(report, callback) {
  // We return results as an array for query-like requests
  var asArray = true;

  if (typeof report === 'string') {
    report = {
      where: {
        savedName: report
      }
    };
  } else if (typeof report === 'number') {
    asArray = false;
    report = {
      where: {
        settingsId: report
      }
    };
  }

  if (Array.isArray(report)) {
    return async.mapSeries(report, (r, callback) => {
      this.runReport(r, callback);
    }, (err, results) => {
      callback(err, _.flattenDeep(results));
    });
  } else {
    if (_.has(report, 'where')) {
      return this.getReport(report, (err, reports) => {
        if (err) {
          return callback(err);
        }

        this.runReport(reports.length === 1 && !asArray ? reports[0] : reports, callback);
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
          results: csvjson.toObject(data, {
            delimiter: ',',
            wrap: '"'
          })
        }));
      });
    }
  }
};

module.exports = runReport;
