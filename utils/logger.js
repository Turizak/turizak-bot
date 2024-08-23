const winston = require("winston");

// Configure the Winston logger
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    }),
    winston.format.prettyPrint()
  ),
  transports: [new winston.transports.Console()],
});

exports.logger = logger;
