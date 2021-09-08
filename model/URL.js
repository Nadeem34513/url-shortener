const mongoose = require('mongoose')

const URLSchema = new mongoose.Schema({
    longURL: String,
    shortURL: String,
    urlCode: String,
    // date: {
    //     type: new Date,
    //     default: Date
    // }
})

const URL = mongoose.model('URL', URLSchema)
module.exports = URL