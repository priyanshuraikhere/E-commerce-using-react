const jwt = require("jsonwebtoken");

const auth = (requiredRole) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized - No Token" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
// console.log("Decoded Token:", decoded);

      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ message: "Forbidden - Not allowed" });
      }

      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }
  };
};

module.exports = auth;