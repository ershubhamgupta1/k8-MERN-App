const { createLogger, format, transports } = require('winston');

module.exports = createLogger({
transports:
    new transports.File({
    filename: 'logs/server.log',
    format: format.json()
    })
});