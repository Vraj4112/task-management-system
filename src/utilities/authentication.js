const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "fv45De2Hcdf44WDl";

// Function to sign a JWT token
const signToken = (user) => {
  const payload = {
    id: user.id,
    name: user.name,
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
  try {
    // Decode the JWT and return the user payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; // Decoded payload should match your expectations
  } catch (error) {
    console.error("JWT validation failed:", error.message);
    throw new Error("Invalid token");
  }
};

module.exports = { signToken, validateToken };
