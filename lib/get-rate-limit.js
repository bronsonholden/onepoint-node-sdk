module.exports = function () {
  var threshold = this.callThreshold;
  var calls = this.currentCalls;

  if (typeof threshold !== 'number' || typeof calls !== 'number') {
    return null;
  }

  return {
    threshold: threshold,
    calls: calls
  };
};
