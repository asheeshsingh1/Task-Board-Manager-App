const express = require('express')
const app = express()
require('./src/db/mongoose')
const userRoutes = require('./src/routes/user')
const taskRoutes = require('./src/routes/task')
const boardRoutes = require('./src/routes/board')

app.use(express.json())

//Users
app.use(userRoutes)
//Tasks
app.use(taskRoutes)
//Boards
app.use(boardRoutes)

app.get("/", (req, res) => {
  res.json({name : "Asheesh Singh has developed this Todo Lsit App"})
});

module.exports = app;