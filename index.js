const express = require('express'); 
const mongoose = require('mongoose')
const dot = require('dotenv')
const app = express() 

// Middlewares
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(express.json())
dot.config()

// DB
mongoose.connect(process.env.URI)
mongoose.connection.on('open', () => console.log('Connection made'))

// Routes
app.use('/', require('./routes/url'))

const PORT = process.env.PORT || 8000 
app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`))