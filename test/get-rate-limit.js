const { describe, it, before, after } = require('mocha');
const { expect } = require('chai');
const OnePoint = require('../index');
const env = require('./env.js');

describe('rate-limit', function () {
  var onePoint;

  this.timeout(30000);

  before(function (done) {
    onePoint = new OnePoint(env);
    onePoint.connect(done);
  });

  after(function (done) {
    onePoint.close(done);
  });

  it('returns null for unknown rate limits', function (done) {
    var onePoint = new OnePoint(env);

    expect(onePoint.getRateLimit()).to.not.exist;

    done();
  });

  it('returns current calls and threshold', function (done) {
    onePoint.listReports((err, reports) => {
      expect(err).to.not.exist;

      var limit = onePoint.getRateLimit();

      expect(limit).to.exist;
      expect(limit.calls).to.be.a('number');
      expect(limit.calls).to.be.above(0);
      expect(limit.threshold).to.be.a('number');
      expect(limit.threshold).to.be.above(0);

      done();
    });
  });
});
