require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')

const app = express()
const PORT = process.env.PORT || 5002

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.log("MongoDB Error", error))

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

async function startServer() {
    try {
        app.listen(PORT, () => console.log(`Upload service running on port: ${PORT}`))
    } catch (error) {
        console.error(`Failed to connect to server ${error}`)
        process.exit(1)
    }
}

startServer()