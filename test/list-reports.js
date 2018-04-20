const { describe, it, before, after } = require('mocha');
const chai = require('chai');
const expect = chai.expect;
const OnePoint = require('../index');
const env = require('./env.js');

describe('list-report', function () {
  var onePoint;

  this.timeout(10000);

  before(function (done) {
    onePoint = new OnePoint(env);
    onePoint.connect((err) => {
      expect(err).to.not.exist;
      done();
    });
  });

  after(function (done) {
    onePoint.close(done);
  });

  it('lists reports', function (done) {
    onePoint.listReports((err, reports) => {
      expect(err).to.not.exist;
      expect(reports).to.be.an('array');
      done();
    });
  });
});
