const express = require('express')
const router = new express.Router()
const User = require('../models/users')
const auth = require('../middleware/auth')
const multer = require('multer')

const upload = multer({
  limits:{
    fileSize : 2000000
  },
  fileFilter(req,file,cb){
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
      return cb(new Error('Please upload a file with .JPG, .JPEG or .PNG extension!!!'))
    }
    cb(undefined,true);
  }
})

router.post('/users',async (req, res)=>{
    const user = new User(req.body)
    try{
      await user.save()
      const token = await user.generateJWT()
      res.status(201).send({user,token})
    }catch(e){
      res.status(400).send({
          status:e.name,
          statusMessage:e.message
        })
    }
})

router.post('/users/login',async (req, res)=>{
    try{
      const user = await User.findByCredentials(req.body.email,req.body.password)
      const token = await user.generateJWT()
      res.send({user,token})
    }catch(e){
      res.status(400).send({
          message:"Invalid Credentials"
        })
    }
})

router.post('/users/logout',auth,async (req, res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
        return token.token !== req.token;
      })
      await req.user.save()
      res.send()
    }catch(e){
      res.status(500).send({
          message:"Logout Failed"
        })
    }
})

router.post('/users/logoutall',auth,async (req, res)=>{
    try{
        req.user.tokens = [];
        await req.user.save()
        res.send()
    }catch(e){
      res.status(500).send({
          message:"Logout Failed"
        })
    }
})

router.get('/users/myprofile',auth, async (req,res)=>{
  res.send(req.user)
})

router.patch('/users/myprofile',auth, async (req,res)=>{
  const reqKeys = Object.keys(req.body)
  const allowedKeys = ['name','password']
  const isValidKey = reqKeys.every((update)=> allowedKeys.includes(update))

  if(!isValidKey){
    return res.status(404).send({"errorMessage":"Invalid Key Present"})
  }
  try{
    reqKeys.forEach((update) => req.user[update] = req.body[update])
    await req.user.save()
    res.send(req.user)
  }catch(e){
    res.status(400).send({
        status:e.name,
        statusMessage:e.message
      })
  }
})

router.delete('/users/myprofile',auth, async (req,res)=>{
  try{
    await req.user.remove()
    res.send(req.user)
  }catch(e){
    res.status(400).send({
        status:e.name,
        statusMessage:e.message
      })
  }
})

//DP Routes
router.post('/users/myprofile/dp',auth,upload.single('dp'), async (req,res)=>{
  req.user.dp = req.file.buffer
  await req.user.save()
  res.send({
    status:"Successfuly uploaded profile pic."
  })
}, (error,_req,res)=>{
  res.status(400).send({
    status: "File type Validation Failed",
    statusMessage: error.message
  })
})

router.delete('/users/myprofile/dp',auth, async (req,res)=>{
  req.user.dp = undefined
  await req.user.save()
  res.send({
    status:"Successfuly deleted profile pic."
  })
})

router.get('/users/:id/dp', async (req,res)=>{
  try{
    const user = await User.findById(req.params.id);
    // console.log(user)
    if(!user || !user.dp){
      throw new Error('No DP associated with the User.')
    }
    res.set('Content-Type','image/jgp')
    res.send(user.dp)
  }catch(e){
    res.status(404).send({
      status:e.name,
      statusMessage:e.message
    })
  }
})


module.exports = router