const Pool = require('pg-pool')

const commonConfig = {
    "user" : process.env.POSTGRES_USER,
    "password" : process.env.POSTGRES_PASSWORD,
    "database" : process.env.POSTGRES_DATABASE,
    max: 15
}

let mainPool = null;
// This should technically come from a service
// whose responsibility just manage connections and run
// queries from different services. I have kept it simple here in a class.
class PgConnection {

    constructor() {
        if (!mainPool) {
            console.log("called how many times?")
            mainPool = {
                "connection" : new Pool({
                    "host": process.env.POSTGRES_HOSTNAME,
                    "port" : "5432",
                    ...commonConfig
                })
            }
        }
    }

    getPool() {
        return mainPool;
    }
}

module.exports = PgConnection