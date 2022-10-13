const express = require('express')
const app = express()
require('./src/db/mongoose')
const userRoutes = require('./src/routes/user')
const taskRoutes = require('./src/routes/task')
const boardRoutes = require('./src/routes/board')
const logger = require('./src/middleware/logger')
app.use(express.json())

app.use(logger.loggerGeneric);

//Users
app.use(userRoutes)
//Tasks
app.use(taskRoutes)
//Boards
app.use(boardRoutes)

app.get("/", (req, res) => {
  res.json(
    {
      Credit : "Asheesh Singh has developed this Todo List App",gitHubLink:"https://github.com/asheeshsingh1",readmeLink:"https://github.com/asheeshsingh1/TodoApp#readme"
    })
});

module.exports = app;