const PgConnection  = require("../../../shared/db")
const Result = require("../../../shared/errors/Result")
const AppError = require("../../../shared/errors/AppError")
const {getShortUrl} = require("../../../shared/utils");


// get the connection pool
const db = new PgConnection();
const getUrlInfoById = async (req, res) => {
    const id = req.params.id;
    try {
        const connection = db.getPool()["connection"]
        const result = await connection.query("SELECT * FROM URL_TABLE WHERE id = $1", [id]);
        if (result.rowCount > 0) {
            const row = result.rows[0];
            const data = {
                "id": row.id,
                "shortened_url": getShortUrl(row.url_id),
                "original_url": row.url
            }

            res.status(200)
            res.send(Result.ok({...data}))
        } else {
            res.status(404);
            res.send(Result.fail({message: "url not found"}));
        }
    } catch (err) {
        throw new AppError.createError({message: "error while fetching the data", ...err})
    }
}

module.exports = getUrlInfoById