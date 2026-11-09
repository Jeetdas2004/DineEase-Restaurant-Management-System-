import Menu from "../models/menuModel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const handleImageUpload = async (req) => {
  if (!req.file) return null;

  if (
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  ) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "dineease",
      });
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return result.secure_url;
    } catch (err) {
      console.warn("Cloudinary upload failed, falling back to local file URL:", err.message);
    }
  }

  const host = req.get("host") || "localhost:5000";
  const protocol = req.protocol === "https" ? "https" : "http";
  return `${protocol}://${host}/uploads/${req.file.filename}`;
};

export const addMenuItem = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    if (!name || !description || !price || !category || !req.file) {
      return res
        .status(400)
        .json({ message: "All fields including image are required", success: false });
    }

    const imageUrl = await handleImageUpload(req);

    const newMenuItem = await Menu.create({
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      category,
      image: imageUrl,
      isAvailable: true,
    });

    const populated = await newMenuItem.populate("category", "name");

    res.status(201).json({
      message: "Menu item added successfully",
      success: true,
      menuItem: populated,
    });
  } catch (error) {
    console.error("Error in addMenuItem:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await Menu.find()
      .populate("category", "name")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, menuItems });
  } catch (error) {
    console.error("Error in getAllMenuItems:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, isAvailable } = req.body;

    const menuItem = await Menu.findById(id);
    if (!menuItem) {
      return res
        .status(404)
        .json({ message: "Menu item not found", success: false });
    }

    if (req.file) {
      const imageUrl = await handleImageUpload(req);
      if (imageUrl) menuItem.image = imageUrl;
    }

    if (name) menuItem.name = name.trim();
    if (description) menuItem.description = description.trim();
    if (price !== undefined) menuItem.price = Number(price);
    if (category) menuItem.category = category;
    if (isAvailable !== undefined) menuItem.isAvailable = isAvailable === "true" || isAvailable === true;

    await menuItem.save();
    const populated = await menuItem.populate("category", "name");

    res.status(200).json({
      message: "Menu item updated successfully",
      success: true,
      menuItem: populated,
    });
  } catch (error) {
    console.error("Error in updateMenuItem:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await Menu.findByIdAndDelete(id);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found", success: false });
    }
    res.status(200).json({ success: true, message: "Menu item deleted successfully" });
  } catch (error) {
    console.error("Error in deleteMenuItem:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};
