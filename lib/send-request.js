const request = require('request');
const _ = require('lodash');

module.exports = function (req, callback) {
  request(req, (err, res, body) => {
    if (_.get(res, [ 'headers', 'content-type' ]).indexOf('application/json') > -1 && typeof body === 'string') {
      body = JSON.parse(body);
    }

    if (err) {
      return callback(err);
    }

    if (res.statusCode !== 200) {
      if (!_.has(body, 'errors')) {
        return callback(new Error(`${res.statusCode} ${res.statusMessage}`));
      }

      var errors = _.map(_.get(body, 'errors'), (err) => `${err.code} ${err.message}`).join('\n');

      return callback(new Error(errors));
    }

    callback(null, body);
  });
};
