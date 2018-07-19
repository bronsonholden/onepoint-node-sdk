/**
 * Return the latest rate limit metrics.
 *
 * @memberof OnePoint
 * @instance
 */
function getRateLimit() {
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

module.exports = getRateLimit;
