const http = require('http');  
const app = require('./app');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const printLog = require('./src/middleware/logger')

server.listen(port,()=>{
    printLog.logger.info("App is up on Port: " + port);
});