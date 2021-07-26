const app = require('express')();
const bodyParser = require('body-parser');
const v1Router = require('./api/v1')
const {AppError} = require("./shared/errors");
const { getUrlInfo } = require("./api/shortener/controller/getUrlCacheInfo")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// for end user to redirect the url

// api to support our needs
app.use('/api/v1', v1Router);
app.get('/:urlId', getUrlInfo)


//global error handler
app.use(function (err, req, res, next) {
    // error will be always App error
    console.log(err)
    if (err instanceof AppError)
        res.status(500).send(err.formatErrorResponse())
    else
        res.status(500).send({message: "Something went wrong"})
})
app.listen(process.env.API_PORT || 8082, () => {
    console.log(`Listening on PORT: ${process.env.API_PORT}`);
})
