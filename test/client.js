const _ = require('lodash');
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const OnePoint = require('../index');
const env = require('./env.js');

describe('client', function () {
  this.timeout(10000);

  // Handle invalid requests (err from host response)
  it('handles invalid request', function (done) {
    var onePoint = new OnePoint(env);

    onePoint.sendRequest({
      method: 'INVALID',
      baseUrl: 'https://www.google.com',
      uri: '/'
    }, (err, res, body) => {
      expect(err).to.be.an('error');
      expect(res).to.not.exist;
      expect(body).to.not.exist;
      done();
    });
  });

  // Handle invalid requests (err from request())
  it('handles malformed request', function (done) {
    var onePoint = new OnePoint(env);

    onePoint.sendRequest({
      method: 'GET',
      baseUrl: 'www.google.com',
      uri: '/'
    }, (err, res, body) => {
      expect(err).to.be.an('error');
      expect(res).to.not.exist;
      expect(body).to.not.exist;
      done();
    });
  });

  // Handle invalid requests (err from request())
  it('handles invalid task', function (done) {
    var onePoint = new OnePoint(env);

    onePoint.queue.push({
      invalid: true
    }, 0, (err) => {
      expect(err).to.be.an('error');
      done();
    });
  });

  it('waits for pending requests', function (done) {
    var onePoint = new OnePoint(env);

    onePoint.queue.push({
      idle: 1000
    }, () => { });

    onePoint.close(() => {
      done();
    });
  })
});
