const Result = require('./Result')

class AppError extends Result {
    constructor(err) {
        super(false, err);
    }

    static createError(err) {
        return new AppError(err);
    }
}

module.exports = AppError