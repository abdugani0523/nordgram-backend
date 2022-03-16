import {fileURLToPath} from 'url';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


export function readFile (path) {
    const databasePath = join(__dirname, path + '.json')
    if (!existsSync(databasePath)) throw new Error(`No such json file at ${path}!`)
    try {
        return JSON.parse(readFileSync(databasePath, 'utf8'))
    } catch (err) {
        console.log(err.message)
    } 
}

export function writeFile (path, data) {
    const databasePath = join(__dirname, path + '.json')
    if (!existsSync(databasePath)) throw new Error(`No such json file at ${path}!`)
    return writeFileSync(databasePath, JSON.stringify(data, null, 4));
}