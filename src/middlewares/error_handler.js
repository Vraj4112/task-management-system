const logger = require("../utilities/logger");

const errorHandler = (err, req, res) => {
  console.error(err.stack);
  logger.error(err.message, { metadata: err });
  res.status(err.status || 500).json({
    message: err.message || "Something broke!",
  });
};

module.exports = errorHandler;
