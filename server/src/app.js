import { parseQuery, loadBody, done, reject } from './lib/index.js'

export function Server (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    parseQuery(req)

    switch (req.method) {
        case 'GET': {

            switch (req.pathname) {
                
            }

            break;
        }
        case 'POST': {
            loadBody(req);
            break;
        }
        default: {
            reject(res, `You cannot send a '${req.method}' request! `);
            break;
        }
    }
}

// export function Server (req, res) {
//     res.setHeader("Access-Control-Allow-Origin", "*")
    
//     res.setHeader("Content-Type", "application/json")
//     // needed data
//     let method = req.method;
//     let url = req.url

//     // handlers
    
//     const parsed = parse(url, true)
//     let query = parsed.query    
//     switch (method) {
//         case 'GET': {
//             if (parsed.pathname === '/users' || parsed.pathname === '/chats' || parsed.pathname === '/messages'){
//                 let data;
//                 if (Object.keys(query).length !== 0){
//                     data =  JSON.parse(readFile(parsed.pathname.slice(1), true))
//                     data = data.find(item => {
//                         let sign = true;
//                         for (let i in query){
//                             if (item[i] != query[i]){
//                                 sign = false;
//                                 break;
//                             }
//                         }
//                         return sign;
//                     })
//                     if (!data) return res.end(JSON.stringify({
//                         OK: false,
//                         message: "Not found"
//                     }))
//                     data.OK = true
//                     res.end(JSON.stringify(data))
//                 } else {
//                     data =  readFile(parsed.pathname.slice(1))
//                     res.end(data)
//                 }   
//             } else {
//                 res.end(JSON.stringify({
//                     OK: false,
//                     message: "Cannot get " + parsed.pathname
//                 }))
//             }
//             break;
//         }

//         case 'POST': {
//             if (parsed.pathname != '/users' && parsed.pathname != '/messages' && parsed.pathname != '/chats') return res.end('[]')

//             let data = ''
//             req.on('data', chunk => {
//                 data += chunk;
//             })
//             req.on('end', () => {
//                 try {
//                     data = JSON.parse(data)
//                 } catch (err) {
//                     return res.end(
//                         JSON.stringify({
//                             OK: false,
//                             title: 'Parse error',
//                             message: err.message
//                         })
//                     )
//                 }
//                 console.log(data);
//                 const check = postHandlers[parsed.pathname.slice(1)]?.(data)
//                 if (!!check != true){
//                     return res.end(JSON.stringify({
//                         OK: false,
//                         message: "Failed"
//                     }))                  
//                 }
//                 res.end(JSON.stringify({
//                     OK: true,
//                     message: "Successfully",
//                     data: check
//                 }))                  
//             })
//             break;
//         }
//         case 'OPTIONS': {
//             res.setHeader("Access-Control-Allow-Headers", "*")
//             res.end('[]')
//             break;
//         }
//     }
// }