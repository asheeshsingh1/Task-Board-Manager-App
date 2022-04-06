const mongoose = require('mongoose')
const Board = require('./src/models/boards')

const validateBoardId = async (boardId,ownerId) =>{
    try{
    const board = await Board.findOne({_id:boardId,owner:ownerId});
        return !(!board);
    }catch(e){
        console.log(e)
        return false;
    }
}

module.exports = validateBoardId;
