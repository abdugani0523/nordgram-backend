import { readFile, writeFile } from '../db/index.js'
import { done, reject } from '../lib/index.js'
import {
    validateUser,
    encrypt,
    mapGender,
    generateAvatar,
    identifyGender,
} from '../lib/users.js'

export const usersApi = {
    get(req, res) {
        let users = readFile('users')
        let { query } = req
        if (Object.keys(query).length) {
            if (query.password) query.password = encrypt(query.password)
            const find = users.find((user) => {
                let sign = true
                for (let property in query) {
                    if (user[property] != query[property]) {
                        sign = false
                        break
                    }
                }
                return sign
            })

            if (find) {
                delete find.password
                find.gender = identifyGender(find.gender)
                return done(res, find)
            }

            return reject(res, 'User not found!')
        }

        done(res, mapGender(users), 'All users')
    },
    post(req, res) {
        let users = readFile('users')
        let { body } = req
        if (!validateUser(body, users))
            return reject(res, 'Could not pass validation!')

        const newUser = {
            id: users.length ? users[users.length - 1].id + 1 : 1,
            firstname: body.firstname,
            lastname: body.lastname,
            age: body.age,
            gender: body.gender,
            username: body.username,
            password: encrypt(body.password),
            avatar: generateAvatar(body.gender),
        }

        users.push(newUser)
        writeFile('users', users)
        newUser.gender = identifyGender(newUser.gender)
        done(res, newUser)
    },
}
