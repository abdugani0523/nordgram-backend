// import dotenv from 'dotenv'
// dotenv.config()

import { createServer } from 'http'
import { Server } from './src/app.js'

const PORT = process.env.PORT ?? 5000

const server = createServer(Server)

server.listen(PORT, () => console.log(`http://localhost:${PORT}`))
