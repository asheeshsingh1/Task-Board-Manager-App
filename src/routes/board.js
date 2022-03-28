const express = require('express')
const router = new express.Router()
const Board = require('../models/boards')
const auth = require('../middleware/auth')

router.post('/boards',auth,async (req, res) => {
    const board = new Board({
      ...req.body,
      owner: req.user._id
    })
    try{
      await board.save()
      res.status(201).send(board)
    }catch(e){
      res.status(400).send({
          status:e.name,
          statusMessage:e.message
        })
    }
})

router.get('/boards',auth,async (req,res)=>{
  try{
    const board = await Board.find({owner:req.user._id})
    res.send(board)
  }catch(e){
    res.status(400).send({
        status:e.name,
        statusMessage:e.message
      })
  }
})

router.get('/boards/:id', auth,async (req,res)=>{
  const _id = req.params.id;
  try{
    const board = await Board.findOne({_id,owner:req.user._id})
    if(!board){
      return res.status(404).send()
    }
    res.send(board)
  }catch(e){
    res.status(400).send({
        status:e.name,
        statusMessage:e.message
      })
  }
})

router.patch('/boards/:id',auth,async (req,res)=>{
  const reqKeys = Object.keys(req.body)
  const allowedKeys = ['active']
  const isValidKey = reqKeys.every((update)=> allowedKeys.includes(update))

  if(!isValidKey){
    return res.status(404).send({"errorMessage":"Invalid Key Present"})
  }
  try{
    const board = await Board.findOne({_id:req.params.id,owner:req.user._id})
    if(!board){
      return res.status(404).send()
    }
    reqKeys.forEach((update) => board[update] = req.body[update])
    await board.save()
    res.send(board)
  }catch(e){
    res.status(400).send({
        status:e.name,
        statusMessage:e.message
      })
  }
})

router.delete('/boards/:id',auth,async (req,res)=>{
  const _id = req.params.id;
  try{
    const board = await Board.findOneAndDelete({_id:req.params.id,owner:req.user._id})
    if(!board){
      return res.status(404).send()
    }
    res.send(board)
  }catch(e){
    res.status(400).send({
        status:e.name,
        statusMessage:e.message
      })
  }
})

module.exports = router