// Class handle to error and json response.
class Result {
    constructor(isSuccess, error, value) {
        this.isSuccess = isSuccess;
        this.isFailure = !isSuccess;
        this.error = error
        this.value = value

        Object.freeze(this); //lets freeze this
    }

    getValue() {
        if (!this.isSuccess) {
            console.log(this.error);
            throw new Error("Use getError");
        }

        return this.value
    }

    getError() {
        return this.error;
    }

    formatErrorResponse() {
        return {
            success: false,
            error: {
                message: this.error.message
            }
        }
    }

    // Helper to return quickly and also make sure
    // our response structure are common across
    static ok(params) {
        return new Result(true, undefined, {"success" : "true", ...params}).getValue();
    }

    static fail(params) {
        return new Result(false, {"success": "false", ...params}).getError()
    }
}

module.exports = Result