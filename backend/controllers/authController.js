import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const getJwtSecret = () => process.env.JWT_SECRET || "dineease_secret_jwt_key_2026";

// Generate JWT Cookie
const generateToken = (res, payload) => {
  const token = jwt.sign(payload, getJwtSecret(), { expiresIn: "1d" });
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });
  return token;
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all the fields",
        success: false,
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    generateToken(res, { id: user._id, email: user.email, role: "user" });

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide both email and password",
        success: false,
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password", success: false });
    }

    generateToken(res, { id: user._id, email: user.email, role: user.isAdmin ? "admin" : "user" });

    res.json({
      message: "User logged in successfully",
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill all fields",
        success: false,
      });
    }

    const adminEmail = (process.env.ADMIN_EMAIL || "admin@dineease.com").toLowerCase().trim();
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
    const normalizedEmail = email.toLowerCase().trim();

    if (normalizedEmail !== adminEmail || password !== adminPassword) {
      return res.status(401).json({ message: "Invalid admin credentials", success: false });
    }

    // Find or create admin user in DB
    let adminUser = await User.findOne({ email: adminEmail });
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      adminUser = await User.create({
        name: "Restaurant Manager",
        email: adminEmail,
        password: hashedPassword,
        isAdmin: true,
      });
    }

    generateToken(res, { id: adminUser._id, email: adminEmail, role: "admin" });

    return res.json({
      success: true,
      message: "Admin logged in successfully",
      admin: {
        email: adminEmail,
        name: adminUser.name,
      },
    });
  } catch (error) {
    console.error("Error in adminLogin:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";
    res.clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });
    return res.json({ message: "Logged out successfully", success: true });
  } catch (error) {
    console.error("Error in logoutUser:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error("Error in getProfile:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const isAuth = async (req, res) => {
  try {
    const { id, email, role } = req.user;
    if (role === "admin" && !id) {
      return res.json({ success: true, user: { email, name: "Admin", isAdmin: true } });
    }
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error("Error in isAuth:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};
