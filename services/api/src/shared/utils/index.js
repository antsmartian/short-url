const crypto = require('crypto');

const getHash = (url) => {
    const hash = crypto.createHash("sha256").update(url).digest("base64");

    // base64 can include `/` which can break our GET call
    return hash.replace("/","")
}

const shuffle = (string) => {
    return string.split('').sort(function(){return 0.5-Math.random()}).join('');
}

const getShortUrl = (path) => {
    const baseUrl = 'http://localhost:8080/'
    return `${baseUrl}${path}`
}

module.exports = { getHash, shuffle, getShortUrl }