const e = require('express');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')
// const validator = require('validator')
const validBoard = require('../../customValidator')

// const completedState = {
//     TYPE1: 'Todo',
//     TYPE2: 'Doing',
//     TYPE3: 'Done'
// }
const completedState = Object.freeze({
  Init: 'Todo',
  Mid: 'Doing',
  Final: 'Done',
});

//Task Data Model
const Task =  mongoose.model('Task',{
    description:{
        type: String,
        required: true,
        trim: true
    },
    completed:{
        type: String,
        enum: Object.values(completedState),
        default: completedState.TYPE1,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    refBoard:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Board'
    }
    // boardid:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     validate(value){
    //         validBoard(value,ownerGlobal).then((flagBoard)=>{
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