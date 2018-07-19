/**
 * @memberof OnePoint
 * @instance
 * @param {object} req - The request to enqueue for the client.
 * @param {number} priority - The priority index for this request. Higher priority requests have lower priority indices.
 */
function enqueueRequest(req, priority, callback) {
  if (this.closing) {
    process.nextTick(() => {
      callback(new Error('Client is currently shutting down'));
    });
  } else {
    this.queue.push({
      request: req
    }, priority, callback);
  }
};

module.exports = enqueueRequest;
