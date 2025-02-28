const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "fv45De2Hcdf44WDl";

// Function to sign a JWT token
const signToken = (user) => {
  const payload = {
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
};

// Middleware to verify JWT token
const validateToken = (token) => {
  const payload = jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
  });

  return payload;
};

module.exports = { signToken, validateToken };
