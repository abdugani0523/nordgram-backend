import { parseQuery, loadBody, done, reject } from './lib/index.js'
import { usersApi } from './api/users.js'
import { chatsApi } from './api/chats.js'
import { checkStatic } from './api/static.js';


export async function Server (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    parseQuery(req)

    switch (req.method) {
        case 'GET': {
            const isStatic = checkStatic(req.url)
            if (isStatic) {
                res.writeHead(200, { 'Content-Type': isStatic.type })
                return res.end(isStatic.data)
            }

            switch (req.pathname) {
                // case '/': return rootApi(req, res)
                case '/users': return usersApi.get(req, res)
                case '/chats': return chatsApi.get(req, res)
            }
            break;
        }
        case 'POST': {
            req.body = await loadBody(req);

            try {
                req.body = JSON.parse(req.body) 
            } catch (err){
                console.log(err.message)
                return reject(res, 'Invalid request body!');
            }

            switch (req.pathname) {
                case '/users': return usersApi.post(req, res)
                case '/chats': return chatsApi.post(req, res)
            }

            break;
        }
        default: return reject(res, `You cannot send a '${req.method}' request! `);
    }
    reject(res, `You cannot ${req.method} ${req.url}`);
}