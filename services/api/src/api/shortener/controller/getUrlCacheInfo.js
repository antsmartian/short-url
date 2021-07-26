const RedisClient  = require("../../../shared/cache")
const PgConnection  = require("../../../shared/db")
const redis = require('redis');
const util = require('util')
const Result = require("../../../shared/errors/Result")
const AppError = require("../../../shared/errors/AppError")
const {getShortUrl} = require("../../../shared/utils");


// get the connection pool
const db = new PgConnection();
const client = new RedisClient().getClient();

const saveIntoCache = (urlId,data) => {
    try {
        client.set(urlId, JSON.stringify(data), redis.print);
    } catch (e) {
        console.log("saving into redis failed ", e)
    }
}

const getUrlInfo = async (req, res) => {
    const urlId = req.params.urlId;
    const redisGet = util.promisify(client.get).bind(client);

    try {
        const result = await redisGet(urlId);
        if (result === null) { //no data found
            const connection = db.getPool()["connection"]
            const result = await connection.query("SELECT * FROM URL_TABLE WHERE URL_ID = $1", [urlId]);
            if (result.rowCount > 0) {
                const row = result.rows[0];
                const data = {
                    "id": row.id,
                    "shortened_url": getShortUrl(urlId),
                    "original_url": row.url
                }

                //set the cache
                saveIntoCache(urlId, data)
                console.log("saved ", data)
                res.redirect(302, data.original_url)
            } else {
                res.status(404);
                res.send(Result.fail({message: "url not found"}));
            }
        }
        else {
            res.redirect(302 ,JSON.parse(result).original_url);
        }
    } catch (err) {
        throw new AppError.createError({message: "error while fetching the data", ...err})
    }
}

module.exports = {
    getUrlInfo
}