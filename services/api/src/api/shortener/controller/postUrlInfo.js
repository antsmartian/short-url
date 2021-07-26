const PgConnection  = require("../../../shared/db")
const { getHash } = require("../../../shared/utils")
const Result = require("../../../shared/errors/Result")
const AppError = require("../../../shared/errors/AppError")
const {getShortUrl} = require("../../../shared/utils");

const db = new PgConnection();
const postUrlInfo = async (req, res) => {

    const url = req.body.url;
    const hash = getHash(url);
    const urlID = hash.substr(0, 5);
    const connection = db.getPool()["connection"]
    try {
        const result = await connection.query("select url_id, id from URL_TABLE where url=$1", [url]);
        if (result.rows.length > 0) {
            const row = result.rows[0];
            res.status(200);
            res.send(Result.ok({
                "id": row.id,
                "shortened_url": getShortUrl(row.url_id),
                "original_url": url
            }));
        } else {
            const result = await connection.query("INSERT INTO URL_TABLE (URL, URL_ID) VALUES ($1, $2) returning id", [url, urlID]);
            if (result.rows.length > 0) {
                res.status(200);
                res.send(Result.ok({
                    "id": result.rows[0].id,
                    "shortened_url": getShortUrl(urlID),
                    "original_url": url
                }));
            }
        }
    } catch(err) {
        throw new AppError.createError({message: "error while saving the data", ...err})
    }

}

module.exports = {
    postUrlInfo
}