import ErrorClass from '#utils/Error.js'
import { deleteAvatar } from '#utils/functions.js'

export default function (err, req, res, next) {
    if (
        !((err instanceof ErrorClass) ||
        ['MulterError', 'SequelizeValidationError', 'SequelizeUniqueConstraintError', 'JsonWebTokenError'].includes(err.name))
    ) {
        console.log(err.message);
        console.log(err.name);
        console.log(err.code);
        err = ErrorClass.InternalServerError('Something has gone wrong on the website\'s server, but the server could not be more specific on what the exact problem is :(')
    }
    
    // Remove uploaded file
    const filename = req.file?.filename
    deleteAvatar(filename)
    
    err.code = (!err.code || typeof err.code == 'string') ? 422 : err.code 
    
    return res.status(err.code).json({
        status: err.code,
        name: err.name,
        message: err.message
    })
}