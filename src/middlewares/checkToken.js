import ErrorClass from '#utils/Error.js';
import { verify } from '#utils/jwt.js'

export default (req, _, next) => {
    const token = req.get('token')
    if (!token) return next(ErrorClass.UnauthorizedError('Token is required!'))
    const { userId, userAgent } = verify(token)
    if (userAgent != req.get('User-Agent')) return next(ErrorClass.ValidationError('The token does not belong to your device!'))
    req.userId = userId;
    next()
}