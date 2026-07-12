const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    console.log("Cookies:", req.cookies);

    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "No token found",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded:", decoded);

    req.user = decoded;
    next();
  } catch (error) {
    console.log("JWT Error:", error.message);

    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = authMiddleware;