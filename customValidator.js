const mongoose = require('mongoose')
const Board = require('./src/models/boards')

const validateBoardId = async (value) =>{
    try{
    const board = await Board.findById(value);
        if(!board){
            return false;
        }
        return true;
    }catch(e){
        console.log(e)
        return false;
    }
}

module.exports = validateBoardId;
