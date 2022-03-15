import { readFile } from '../db/index.js'

const users = readFile('users')

export default users = {
    get (req, res) {
        if (Object.keys(req.query).length){
            users = JSON.parse(users)
            const find = users.find(item => {
                let sign = true;
                for (let i in query){
                    if (item[i] != query[i]){
                        sign = false;
                        break;
                    }
                }
                return sign;
            })
        }
    },
    post (req, res) {

    }
}