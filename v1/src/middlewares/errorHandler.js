import logger from "../scripts/logger/index.js";

const errorHandler = (err, req, res, next) => {
  if (!err.status) {
    logger.log({
      level: "error",
      message: `${req.method} ${req.url} - ${err.message}`,
    });
  }
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error..." });
};

export default errorHandler;
