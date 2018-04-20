const _ = require('lodash');

module.exports = function (options, callback) {
  if (!_.has(options, 'where')) {
    return this.listReports(callback);
  }

  var where = _.get(options, 'where');

  this.listReports((err, reports) => {
    var results = _.filter(reports, where);

    if (results.length === 0) {
      callback(new Error('Invalid report: ' + where));
    } else {
      callback(null, results);
    }
  });
};
