import { createHash } from 'crypto'
import { generate_avatar } from 'cartoon-avatar'

const userModel = [
    ['firstname', 'string'],
    ['lastname', 'string'],
    ['age', 'number'],
    ['gender', 'boolean'], // true -> male, false -> female
    ['username', 'string'],
    ['password', 'string'],
]

export const validateUser = (data, users) => {
    return (
        Object.keys(data).length == 6 &&
        !users.find((user) => user.username == data.username) &&
        userModel.every(([property, type]) => typeof data[property] == type)
    )
}

export function encrypt(txt) {
    return createHash('sha1').update(txt).digest('hex')
}
export let identifyGender = (gender) => (gender ? 'male' : 'female')

export function mapGender(users) {
    return users.map((user) => {
        user.gender = identifyGender(user.gender)
        return user
    })
}

export function generateAvatar(gender) {
    return generate_avatar({ gender: identifyGender(gender) })
}
