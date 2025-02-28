const { validateToken } = require("../utilities/authentication");

const checkForAuthentication = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized access, token missing" });
  }
  try {
    const userPayload = validateToken(token);
    req.user = userPayload;

    next();
  } catch (error) {
    console.error("JWT verify error:", error.message);
    return res
      .status(401)
      .json({ message: "Unauthorized access, invalid token" });
  }
};

module.exports = {
  checkForAuthentication,
};
