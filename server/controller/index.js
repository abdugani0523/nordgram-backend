import { readFileSync, writeFileSync } from "fs"
const dbPath = './db/'
const users = JSON.parse(readFile("users", true))
const chats = JSON.parse(readFile("chats", true))

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
        console.log(data);
        if ((Object.keys(data).length != 3) || !data.users || !Array.isArray(data.users) || !data.from || typeof(data.from) != 'number' || !data.text || typeof(data.text) != 'string' ) return false

        let user1 = users.find(user => data.users[0] == user.id)
        let user2 = users.find(user => data.users[1] == user.id)
        if (!user1 || !user2) return false       

        let user1Chat = chats.find(chat => chat.id == user1.id)
        let user2Chat = chats.find(chat => chat.id == user2.id)
        if (!user1Chat.chats.find(chat => chat.id == user2.id)){
            user1Chat.chats.push({
                id: user2.id
            })
            writeFile('chats', chats)
        }
        
        if (!user2Chat.chats.find(chat => chat.id == user1.id)){
            user2Chat.chats.push({
                id: user1.id
            })
            writeFile('chats', chats)
        }

        let messages = JSON.parse(readFile('messages', true))
        let message = messages.find(item => item.users == data.users.toString())
        if (!message){
            message = messages.find(item => item.users == data.users.reverse().toString())
        }

        let result = {
            from: data.from,
            text: data.text
        }
        if (!message){
            messages.push({
                users: data.users,
                messages: [ result ]
            })
        } else {
            message.messages.push(result)
        }
        writeFile('messages', messages)
        return result;
    }
}

export function getRandomAvatar(){
    const num =  Math.ceil(Math.random() * 6);
    return `https://www.bootdey.com/img/Content/avatar/avatar${num}.png`
}