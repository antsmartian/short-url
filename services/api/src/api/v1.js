const Router = require('express-promise-router');
const shortenerRouter = require("./shortener/index")
const v1Router = new Router();

v1Router.use('/shortener', shortenerRouter);

module.exports = v1Router;