module.exports = function (version) {
  switch (version) {
  case 1:
    return 'https://secure.saashr.com/ta/rest/v1/';
  case 2:
    return 'https://secure.saashr.com/ta/rest/v2/';
  default:
    return null;
  }
};
