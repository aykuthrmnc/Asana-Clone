import winston from "winston";

const logger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
    defaultMeta: { date: new Date() },
  transports: [new winston.transports.File({ filename: "v1/src/logs/general/error.log", level: "error" })],
});

export default logger;
