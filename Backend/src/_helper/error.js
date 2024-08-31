const mongoose = require('mongoose')
const { ValidationError } = mongoose.Error;

class InvalidAttempt extends Error {
    constructor(message, title = "Invalid Attempt") {
        super(message);
        this.title = title;
    }
}

function parseMongoError(errorObject) {
    let errorMessages = [];

    for (const field in errorObject) {
        if (errorObject.hasOwnProperty(field)) {
            const errorDetail = errorObject[field];

            const message = errorDetail.properties && errorDetail.properties.message
                ? errorDetail.properties.message
                : `Invalid input for field: ${field}`;

            errorMessages.push(message);
        }
    }

    return errorMessages.join(', ');
}

function errorHandler(error) {
    const Error = (extra = {}) => ({ error: true, ...extra })
    switch (error.constructor) {
        case InvalidAttempt:
            return Error({
                title: error.title,
                message: error.message
            })
        case ValidationError:
            return Error({
                title: 'Validation Error',
                message: parseMongoError(error.errors)
            })
        default:
            console.log('💥Uncaught Error Exeption:\n', error);
            return Error()
    }
}

module.exports = {
    errorHandler,
    InvalidAttempt,
};