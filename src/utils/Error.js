export default class {
    code;
    name;
    message;

    constructor(code, name, message) {
        this.code = code;
        this.name = name;
        this.message = message;
    }

    static UserInputError(message) {
        return new this(400, 'UserInputError', message)
    }

    static UnauthorizedError(message) {
        return new this(401, 'UnauthorizedError', message)
    }

    static NotFoundError(message) {
        return new this(404, 'NotFoundError', message)
    }

    static InternalServerError(message) {
        return new this(500, 'InternalServerError', message)
    }

    static ValidationError(message) {
        return new this(422, 'ValidationError', message)
    }
}