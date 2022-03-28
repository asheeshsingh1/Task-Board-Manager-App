const e = require('express');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')
// const validator = require('validator')
const validBoard = require('../../customValidator')

//Task Data Model
const Task =  mongoose.model('Task',{
    description:{
        type: String,
        required: true,
        trim: true
    },
    completed:{
        type: Boolean,
        default: false
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    // boardid:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     validate(value){
    //         validBoard(value).then((flagBoard)=>{
    //             console.log(flagBoard);
    //             if(!flagBoard){
    //                 throw new Error('Not a valid Board id');
    //             }
    //         }).catch((error)=>{
    //             console.log(error);
    //         })
    //     }
    // }
})

module.exports = Task;