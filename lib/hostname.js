/**
 * Get the REST API endpoint for a particular version of the API.
 *
 * @param {number|string} version - Which version to get a REST API endpoint for.
 */
function hostname(version) {
  return `https://secure.saashr.com/ta/rest/v${version}/`;
};

module.exports = hostname;
