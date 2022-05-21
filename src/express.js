// Import packages
import express from "express";

// Import middlewares
import modelsMiddleware from "#middlewares/models.js";

const app = express()


// Middlewares
app.use(express.static('images'))
app.use(express.json())
app.use(modelsMiddleware)

// Routes

export default app