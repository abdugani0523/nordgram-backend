import { parse } from 'url'

export function parseQuery (req) {
    const { pathname, query } = parse(req.url, true)
    req.query = query
    req.pathname = pathname
}

export function loadBody (req) {
    let body = '';
    req.on('data', (data) => body += data);
    req.on('end', () => req.body = body);
}

export function reject(res, msg = 'Rejected') {
    res.writeHead(404, { 'Content-Type': 'application/json' })

    const response = {
        ok: false,
        msg
    }
    
    res.end(JSON.stringify(response))
}

export function done(res, data, msg = 'Successfully') {
    res.writeHead(200, { 'Content-Type': 'application/json' })

    const response = {
        ok: true,
        msg,
        data
    }

    res.end(JSON.stringify(response))
}