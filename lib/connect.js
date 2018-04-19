const hostname = require('./hostname');
const _ = require('lodash');

module.exports = function (callback) {
  var self = this;

  var params = {
    method: 'POST',
    baseUrl: hostname(1),
    uri: '/login',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Api-Key': self.apiKey
    },
    body: {
      credentials: {
        username: self.username,
        password: self.password,
        company: self.companyShortName
      }
    },
    json: true
  };

  self.enqueueRequest(params, 0, (err, data) => {
    if (err) {
      return callback(err);
    }

    var token = _.get(data, 'token');

    if (!token) {
      return callback(new Error('No access token received'));
    }

    self.accessToken = token;

    callback();
  });
};
