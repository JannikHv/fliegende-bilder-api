const fetch = require('fetch-base64');

module.exports = (url) => fetch.remote(url);