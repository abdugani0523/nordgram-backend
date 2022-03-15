import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path'

export function readFile (path, utf8) {
    const databasePath = join(__dirname, path + '.json')
    if (!existsSync(databasePath)) throw new Error(`No such json file at ${path}!`)
    return readFileSync(databasePath, utf8);
}

export function writeFile (path, data) {
    const databasePath = join(__dirname, path + '.json')
    if (!existsSync(databasePath)) throw new Error(`No such json file at ${path}!`)
    return writeFileSync(databasePath, JSON.stringify(data, null, 4));
}