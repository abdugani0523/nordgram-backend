// Import packages
import express from "express";
import cors from 'cors'

// Import middlewares
import modelsMiddleware from "#middlewares/models.js";
import errorMiddleware from "#middlewares/error.js";

// Import routers
import authRouter from '#routers/auth.js'
import infoRouter from '#routers/info.js'


const app = express()


// Middlewares
app.use(cors())
app.use('/avatars', express.static('images'))
app.use(express.json())
app.use(modelsMiddleware)

// Routes
app.use(authRouter)
app.use(infoRouter)

// Error handling
app.use(errorMiddleware)

export default app