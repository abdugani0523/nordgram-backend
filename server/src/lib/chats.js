import { readFile } from "../db/index.js";

export function filterChats(chats, member) {
    let maped = chats.map(chat => {
        let index = chat.members.indexOf(member)
        if (index != -1){
            chat.partner = chat.members[+!index];
            delete chat.members;
            return chat;
        }
    })
     
    return maped.filter(chat => chat != undefined)
}

const chatModel = [
    [ 'from', 'number' ],
    [ 'to', 'number' ],
    [ 'text', 'string' ],
  ]

export const validateChat = (data) => {
    return (
        (Object.keys(data).length == 3) && 
        (chatModel.every(([ property, type ]) => typeof(data[property]) == type))
    )
}

export function checkMembers(members) {
    const users = readFile('users')
    return members.every(member => users.find(user => user.id == member))
}