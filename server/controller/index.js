import { readFileSync, writeFileSync } from "fs"
const dbPath = './db/'

export function readFile (path, utf8) {
    let data;
    if (utf8){
        data = readFileSync(dbPath + path + '.json', 'utf-8');
    } else {
        data = readFileSync(dbPath + path + '.json');
    }
    return data;
}

export function writeFile (path, data) {
    writeFileSync(dbPath + path + '.json', JSON.stringify(data, null, 4));
    return data;
}

export const postHandlers = {
    "users": (data) => {
        if ((Object.keys(data).length != 3) || !data.username || typeof(data.username) != 'string' || !data.age || isNaN(+data.age) || !data.password || typeof(data.password) != 'string' ) return false
        
        const users = JSON.parse(readFile("users", true))
        const chats = JSON.parse(readFile("chats", true))
        let id = users.length ? users[users.length - 1].id + 1 : 1
        
        const newUser = {
            id,
            username: data.username,
            age: +data.age,
            password: data.password,
            avatar: getRandomAvatar()
        }
        users.push(
            newUser   
        )

        chats.push({
            id,
            username: data.username,
            chats: []
        })
        
        writeFile("chats", chats);
        writeFile("users", users);
        
        return newUser
    },
    "messages": (data) => {

    }
}

export function getRandomAvatar(){
    const num =  Math.ceil(Math.random() * 6);
    return `https://www.bootdey.com/img/Content/avatar/avatar${num}.png`
}