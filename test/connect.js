const _ = require('lodash');
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const OnePoint = require('../index');
const env = require('./env.js');

describe('connect', function () {
  var onePoint;

  this.timeout(10000);

  before(function (done) {
    onePoint = new OnePoint(env);
    done();
  });

  after(function (done) {
    onePoint.close(done);
  });

  it('handles invalid username', function (done) {
    var onePoint = new OnePoint(_.defaults({
      username: 'invalid'
    }, env));

    onePoint.connect((err) => {
      expect(err).to.be.an('error');
      done();
    });
  });

  it('handles invalid password', function (done) {
    var onePoint = new OnePoint(_.defaults({
      password: 'invalid'
    }, env));

    onePoint.connect((err) => {
      expect(err).to.be.an('error');
      done();
    });
  });

  it('handles invalid API key', function (done) {
    var onePoint = new OnePoint(_.defaults({
      apiKey: 'invalid'
    }, env));

    onePoint.connect((err) => {
      expect(err).to.be.an('error');
      done();
    });
  });

  it('authenticates', function (done) {
    onePoint.connect((err) => {
      expect(err).to.not.exist;
      done();
    });
  });
});
