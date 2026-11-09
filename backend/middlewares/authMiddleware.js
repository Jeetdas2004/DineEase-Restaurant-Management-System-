import jwt from "jsonwebtoken";

const getJwtSecret = () => process.env.JWT_SECRET || "dineease_secret_jwt_key_2026";

export const protect = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Not Authorized, please log in", success: false });
  }
  try {
    const decoded = jwt.verify(token, getJwtSecret());
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Session expired or invalid token", success: false });
  }
};

export const adminOnly = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Admin authorization required", success: false });
  }
  try {
    const decoded = jwt.verify(token, getJwtSecret());
    req.admin = decoded;
    req.user = decoded;
    const adminEmail = process.env.ADMIN_EMAIL || "admin@dineease.com";

    if (decoded.email === adminEmail || decoded.role === "admin") {
      return next();
    }
    return res.status(403).json({ message: "Forbidden: Admin privileges required", success: false });
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token", success: false });
  }
};
