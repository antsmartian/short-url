const redis = require('redis');

let client
class RedisClient {

    constructor() {
        if (!client) {
            client = redis.createClient({
                host: 'redis',
                port: `${process.env.REDIS_PORT}`,
                password: `${process.env.REDIS_PASSWORD}`
            });

            client.on('error', err => {
                // throw err;
            });
        }
    }

    getClient() {
        return client;
    }
}

module.exports = RedisClient