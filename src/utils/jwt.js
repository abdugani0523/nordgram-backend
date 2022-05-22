import jwt from 'jsonwebtoken'
const jwt_secret = process.env.jwt_secret

export const sign = payload => {
    return jwt.sign(payload, jwt_secret)
}

export const verify = token => {
    return jwt.verify(token, jwt_secret)
}