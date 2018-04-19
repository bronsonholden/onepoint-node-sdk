module.exports = function (callback) {
  this.closing = true;

  if (this.queue.length() === 0) {
    setImmediate(callback);
  } else {
    this.queue.drain(callback);
  }
};
