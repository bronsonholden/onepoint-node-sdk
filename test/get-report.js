const { describe, it, before, after } = require('mocha');
const { expect } = require('chai');
const OnePoint = require('../index');
const env = require('./env.js');

describe('get-report', function () {
  var onePoint;

  this.timeout(30000);

  before(function (done) {
    onePoint = new OnePoint(env);
    onePoint.connect(done);
  });

  after(function (done) {
    onePoint.close(done);
  });

  it('get report (exact)', function (done) {
    onePoint.getReport(37393032, (err, report) => {
      expect(err).to.not.exist;
      done();
    });
  });
});
