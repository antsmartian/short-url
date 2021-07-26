const Result = require("../../shared/errors/Result");
const validateUrl = (req, res, next) => {
    const url = req.body.url;

    if (url && url.trim() === '') {
        res.status(400)
        res.send(Result.fail({messages: "url is mandatory"}));
        return;
    }

    // https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
    const pattern = new RegExp('(http[s]?:\\/\\/)'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    if (pattern.test(url))
        next();
    else {
        res.status(400)
        res.send(Result.fail({messages: "send a valid url"}))
    }

}

const isNumber = (req, res, next) => {
    const id = req.params.id;
    if(!/^[0-9]+$/.test(id)) {
        res.status(400)
        res.send(Result.fail({messages: "id should be a number"}));
        return;
    }

    next();
}

module.exports = {
    validateUrl, isNumber
}