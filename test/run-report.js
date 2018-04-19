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
    onePoint.runReport({
      where: {
        savedName: 'Cost Center Level 3 JIDs'
      }
    }, (err, data) => {
      callback(err, onePoint, data);
    });
  },
  (onePoint, data, callback) => {
    callback(null, onePoint);
  },
  (onePoint, callback) => {
    onePoint.getReport({
      where: {
        savedName: 'Cost Center Level 3 JIDs'
      }
    }, (err, reports) => {
      if (err) {
        return callback(err);
      }

      async.eachSeries(reports, (report, callback) => {
        onePoint.runReport(report, (err, data) => {
          if (err) {
            return callback(err);
          }

          callback();
        });
      }, (err) => {
        callback(err, onePoint);
      });
    });
  }
], (err, onePoint) => {
  if (err) {
    console.log(err);
  }

  onePoint.close(() => {
    process.exit(0);
  });
});
