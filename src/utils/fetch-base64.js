const fetch = require('fetch-base64');

/**
 * @param {string} url
 *
 * @returns {Promise<string|null>}
 */
module.exports = (url) => fetch.remote(url)
  .then((res) => res.shift())
  .catch((err) => {
    console.log(err);

    return null;
  });