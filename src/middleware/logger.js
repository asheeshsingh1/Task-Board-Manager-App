const {transports} = require('winston');
const winston = require('winston')
expressWinston = require('express-winston');

const logConfiguration = {
  level: 'warn',
    transports: [
      new winston.transports.Console(),
      new transports.File({filename:'./logs/server.log',})
    ],
    format: winston.format.combine(
      winston.format.label({label:`Label`}),
      winston.format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
      winston.format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`)
    ),
    meta: false,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) { return false; }
};

const loggerGeneric = expressWinston.logger(logConfiguration)
const logger = winston.createLogger(logConfiguration);

module.exports = {loggerGeneric,logger};