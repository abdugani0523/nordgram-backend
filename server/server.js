import { createServer } from "http";
import { env } from './config/index.js'
import { Server } from './src/app.js'

const PORT = env.PORT;
const DOMAIN = env.DOMAIN

const server = createServer(Server)
// const server = createServer((req, res) => {
    
// })

server.listen(PORT, () => console.log(`http://${DOMAIN}:${PORT}`))