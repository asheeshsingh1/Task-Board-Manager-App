const e = require('express');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')

const completedState = Object.freeze({
  Init: 'Todos',
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
})

module.exports = Task;