const logger = require("../utilities/logger");

const errorHandler = (err, req, res, next) => {
  logger.error(err.message, { metadata: err });
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
