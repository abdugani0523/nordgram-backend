import dotenv from 'dotenv'
import { createServer } from "http";
import { Server } from './src/app.js'
dotenv.config()

const PORT = process.env.PORT ?? 5000;

const server = createServer(Server)

server.listen(PORT, () => console.log(`http://localhost:${PORT}`))