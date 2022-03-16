import { readFile, writeFile } from "../db/index.js"
import { done, reject } from "../lib/index.js"
import { checkMembers, filterChats, validateChat } from "../lib/chats.js"


export const chatsApi = {
    get(req, res){
        let chats = readFile('chats')
        let { query } = req
        if (Object.keys(query).length != 1 || !query.member) return reject(res, 'Request must be with query. exp: /chats?member=<id>')
        chats = filterChats(chats, +query.member)
        done(res, chats)
    },
    post(req, res) {
        let chats = readFile('chats');
        let { body } = req; 
        if (!validateChat(body)) return reject(res, 'Could not pass validation!')
        let members = [body.to, body.from]
        if (!checkMembers(members)) return reject(res, 'Member not found!')

        let findChat = chats.find(chat => members.every(member => chat.members.includes(member)))
        const date = new Date()
        const newMessage = {
            from: body.from,
            text: body.text,
            date: {
                localeDate: date.toLocaleDateString(),
                localeTime: date.toLocaleTimeString()
            }
        }
        if (findChat){
            findChat.messages.push(newMessage)
        } else {
            const newChat = {
                id: chats.length ? chats[chats.length - 1].id + 1 : 1,
                members,
                messages: [ newMessage ]
            }
            chats.push(newChat)
        }

        writeFile('chats', chats);
        done(res, newMessage)    
    }
}