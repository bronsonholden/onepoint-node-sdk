const request = require('request');
const _ = require('lodash');

/**
 * @memberof OnePoint
 * @instance
 * @param {object} req - The request to send.
 * @param {function} callback - Called with the HTTP response and body.
 */
function sendRequest(req, callback) {
  request(req, (err, res, body) => {
    var contentType = _.get(res, [ 'headers', 'content-type' ]);

    if (contentType && contentType.indexOf('application/json') > -1 && typeof body === 'string') {
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

    callback(null, res, body);
  });
};

module.exports = sendRequest;
