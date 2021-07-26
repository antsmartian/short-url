const Router = require('express-promise-router');
const shortenerRouter = new Router();
const {postUrlInfo} = require("./controller/postUrlInfo")
const getUrlById = require("./controller/getUrlById")
const {validateUrl, isNumber} = require("./validate")

shortenerRouter.post('/', validateUrl, postUrlInfo);
shortenerRouter.get('/:id', isNumber, getUrlById);

module.exports = shortenerRouter