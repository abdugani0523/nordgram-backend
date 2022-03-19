import { parseQuery, loadBody, done, reject } from './lib/index.js'
import { usersApi } from './api/users.js'
import { chatsApi } from './api/chats.js'

export async function Server(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    parseQuery(req)

    switch (req.method) {
        case 'GET': {
            switch (req.pathname) {
                case '/users':
                    return usersApi.get(req, res)
                case '/chats':
                    return chatsApi.get(req, res)
            }
            break
        }
        case 'POST': {
            req.body = await loadBody(req)
            try {
                req.body = JSON.parse(req.body)
            } catch (err) {
                return reject(res, 'Invalid request body!')
            }

            switch (req.pathname) {
                case '/users':
                    return usersApi.post(req, res)
                case '/chats':
                    return chatsApi.post(req, res)
            }

            break
        }
        case 'OPTIONS': {
            res.setHeader('Access-Control-Allow-Headers', '*')
            return res.end()
        }
        default:
            return reject(res, `You cannot send a '${req.method}' request! `)
    }
    reject(res, `You cannot ${req.method} ${req.url}`)
}