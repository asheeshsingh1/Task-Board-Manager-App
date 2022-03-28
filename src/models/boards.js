const mongoose = require('mongoose')

//Board Data Model
const Board = mongoose.model('Board',{
    boardName:{
        type: String,
        required: true,
        trim: true
    },
    active:{
        type: Boolean,
        default: false
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = Board;