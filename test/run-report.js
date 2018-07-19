const { describe, it, before, after } = require('mocha');
const { expect } = require('chai');
const OnePoint = require('../index');
const env = require('./env.js');

describe('rate limits', function () {
  var onePoint;

  this.timeout(30000);

  before(function (done) {
    onePoint = new OnePoint(env);
    onePoint.connect(done);
  });

  after(function (done) {
    onePoint.close(done);
  });

  it('handles invalid report', function (done) {
    onePoint.runReport({
      where: {
        savedName: 'An Invalid Report Name'
      }
    }, (err, report) => {
      expect(err).to.be.an('error');
      expect(report).to.not.exist;
      done();
    });
  });

  it('runs report where (savedName)', function (done) {
    onePoint.runReport({
      where: {
        savedName: 'Cost Center Level 3 JIDs'
      }
    }, (err, report) => {
      expect(err).to.not.exist;
      expect(report).to.be.an('array');
      done();
    });
  });

  it('runs report where (settingsId)', function (done) {
    onePoint.runReport({
      where: {
        settingsId: 37393032
      }
    }, (err, report) => {
      expect(err).to.not.exist;
      expect(report).to.be.an('array');
      done();
    });
  });

  it('runs report by name (shorthand)', function (done) {
    onePoint.runReport('Cost Center Level 3 JIDs', (err, report) => {
      expect(err).to.not.exist;
      expect(report).to.be.an('array');
      done();
    });
  });

  it('runs report by exact system ID', function (done) {
    onePoint.runReport(37393032, (err, report) => {
      expect(err).to.not.exist;
      expect(report).to.be.an('object');
      done();
    });
  });

  // it('runs multiple reports', function (done) {
  //   onePoint.runReport([
  //     {
  //       where: {
  //         savedName: 'Cost Center Level 3 JIDs'
  //       }
  //     },
  //     {
  //       where: {
  //         savedName: 'Labor by Cost Center'
  //       }
  //     }
  //   ], (err, reports) => {
  //     expect(err).to.not.exist;
  //     expect(reports).to.be.an('array');
  //     done();
  //   });
  // });
});
