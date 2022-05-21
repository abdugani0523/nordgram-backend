import '#config/env.js'
import { createServer } from "http";
import { Server } from "socket.io";
import app from './express.js'
import onConnection from './socket.js'


const port = process.env.app_port ?? 4545
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
});

io.on("connection", onConnection);

httpServer.listen(port, () => console.log('=>', port));