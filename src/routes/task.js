const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Task = require('../models/tasks')

router.post('/tasks',auth,async (req, res) => {
    const task = new Task({
      ...req.body,
      owner: req.user._id
    })
    try{
      await task.save()
      res.status(201).send(task)
    }catch(e){
      res.status(400).send({
          status:e.name,
          statusMessage:e.message
        })
    }
})

router.get('/tasks',auth,async (req,res)=>{
  try{
    const tasks = await Task.find({owner:req.user._id})
    res.send(tasks)
  }catch(e){
    res.status(400).send({
        status:e.name,
        statusMessage:e.message
      })
  }
})

router.get('/tasks/:id',auth,async (req,res)=>{
  const _id = req.params.id;
  try{
    const task = await Task.findOne({_id,owner:req.user._id})
    if(!task){
      return res.status(404).send()
    }
    res.send(task)
  }catch(e){
    res.status(400).send({
        status:e.name,
        statusMessage:e.message
      })
  }
})

router.patch('/tasks/:id',auth,async (req,res)=>{
  const reqKeys = Object.keys(req.body)
  const allowedKeys = ['completed']
  const isValidKey = reqKeys.every((update)=> allowedKeys.includes(update))

  if(!isValidKey){
    return res.status(404).send({"errorMessage":"Invalid Key Present"})
  }
  try{
    const task = await Task.findOne({_id:req.params.id,owner:req.user._id})
    if(!task){
      return res.status(404).send()
    }
    reqKeys.forEach((update) => task[update] = req.body[update])
    await task.save()
    res.send(task)
  }catch(e){
    res.status(400).send({
        status:e.name,
        statusMessage:e.message
      })
  }
})

router.delete('/tasks/:id',auth, async (req,res)=>{
  const _id = req.params.id;
  try{
    const task = await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})
    if(!task){
      return res.status(404).send()
    }
    res.send(task)
  }catch(e){
    res.status(400).send({
        status:e.name,
        statusMessage:e.message
      })
  }
})

module.exports = router