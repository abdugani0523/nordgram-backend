// Setup
import '#config/env.js'
import '#config/sequelize.js'

import { clearAvatar } from '#utils/functions.js';
import onConnection from './socket.js'
import { createServer } from "http";
import { Server } from "socket.io";
import app from './express.js'

const port = process.env.app_port ?? 4545
const httpServer = createServer(app);

// Socket.io
const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
});

// Middlewares
import ModelsMiddleware from '#middlewares/models.socket.js' 


io.use(ModelsMiddleware)
io.on("connection", onConnection);

// Clear all avatar images
clearAvatar()

httpServer.listen(port, () => console.log('=>', port));