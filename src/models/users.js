const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim : true,
        required: true
    },
    password:{
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(!validator.isLength(value,6)){
                throw new Error('Password must be between 6 to 25 characters long');
            }
            if(validator.isEmpty(value)){
                throw new Error('Password can not be empty')
            }
            else if(validator.equals(value.toLowerCase(),"password")){
                throw new Error('Password should not be password!')
            }
            else if(validator.contains(value.toLowerCase(), "password")){
                throw new Error('Password should not contain password!')
            }
        }
    },
    email:{
        type: String,
        trim: true,
        unique: true,
        required: true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is not Valid');
            }
        }
    },
    age:{
        type: Number,
        default: 10,
        validate(value){
            if(value < 10){
                throw new Error('Age must be atleast 10.');
            }
        }
    },
    tokens:[{
        token:{
            type: String,
            required: true,
        }
    }]
})

userSchema.virtual('tasks',{
    ref:'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.virtual('boards',{
    ref:'Board',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function(){
    const user = this
    const userDataObject = user.toObject()

    delete userDataObject.password
    delete userDataObject.tokens

    return userDataObject;
}

//Generating JWT and saving it in DB
userSchema.methods.generateJWT = async function(){
    const user = this
    const token = jwt.sign({_id: user.id.toString()}, 'jwtHashText')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token;
}

//Matching Hashed Password
userSchema.statics.findByCredentials = async (email,password) =>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Invalid Credentials');
    }
    const correctUserCreds = await bcrypt.compare(password,user.password)
    if(!correctUserCreds){
        throw new Error('Invalid Credentials');
    }
    return user;
}

//Hashing password
userSchema.pre('save', async function (next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8);
    }
    next();
})

//User Data Model
const User = mongoose.model('User', userSchema)

module.exports = User;