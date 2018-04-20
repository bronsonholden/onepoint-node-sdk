const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const OnePoint = require('../index');
const env = require('./env.js');

describe('run-report', function () {
  var onePoint;

  this.timeout(30000);

  before(function (done) {
    onePoint = new OnePoint(env);
    onePoint.connect(done);
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

  it('runs report where ...', function (done) {
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

  it('runs report by explicit name', function (done) {
    onePoint.runReport('Cost Center Level 3 JIDs', (err, report) => {
      expect(err).to.not.exist;
      expect(report).to.be.an('object');
      done();
    });
  })

  it('runs multiple reports', function (done) {
    onePoint.runReport([
      {
        where: {
          savedName: 'Cost Center Level 3 JIDs'
        }
      },
      {
        where: {
          savedName: 'Labor by Cost Center'
        }
      }
    ], (err, reports) => {
      expect(err).to.not.exist;
      expect(reports).to.be.an('array');
      done();
    })
  });
});
