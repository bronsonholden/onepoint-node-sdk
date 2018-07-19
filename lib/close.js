/**
 * @memberof OnePoint
 * @instance
 * @param {function} callback - If provided, function will be called once client logs out.
 */
function close(callback) {
  this.closing = true;

  if (!callback) {
    return;
  }

  if (this.queue.length() === 0 && this.queue.running() === 0) {
    setImmediate(callback);
  } else {
    this.queue.drain = callback;
  }
};

module.exports = close;
