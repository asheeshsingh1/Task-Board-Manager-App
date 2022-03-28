const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/todo-list-app', {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify:false
})