import { join, extname } from 'path'
import { existsSync, readFileSync } from 'fs'

const root = join(process.cwd(), 'public')
const contentTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/js',
}

export function checkStatic (url) {
    const path = join(root, url)
    const ext = extname(path)
    const isExists = existsSync(path)

    if (!ext || !isExists) return;


    return {
        data: readFileSync(path),
        type: contentTypes[ext] || 'application/octet-stream'
    }
}


