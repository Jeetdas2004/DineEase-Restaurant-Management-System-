import Category from "../models/categoryModel.js";
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
      // Cleanup local temp file if Cloudinary succeeds
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return result.secure_url;
    } catch (err) {
      console.warn("Cloudinary upload failed, falling back to local file URL:", err.message);
    }
  }

  // Fallback to local server path
  const host = req.get("host") || "localhost:5000";
  const protocol = req.protocol === "https" ? "https" : "http";
  return `${protocol}://${host}/uploads/${req.file.filename}`;
};

export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !req.file) {
      return res
        .status(400)
        .json({ message: "Name and image are required", success: false });
    }

    const alreadyExists = await Category.findOne({ name: { $regex: new RegExp(`^${name.trim()}$`, "i") } });
    if (alreadyExists) {
      return res
        .status(400)
        .json({ message: "Category already exists", success: false });
    }

    const imageUrl = await handleImageUpload(req);

    const newCategory = await Category.create({
      name: name.trim(),
      image: imageUrl,
    });

    res.status(201).json({
      message: "Category added successfully",
      success: true,
      category: newCategory,
    });
  } catch (error) {
    console.error("Error in addCategory:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, categories });
  } catch (error) {
    console.error("Error in getAllCategories:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findById(id);
    if (!category) {
      return res
        .status(404)
        .json({ message: "Category not found", success: false });
    }

    if (req.file) {
      const imageUrl = await handleImageUpload(req);
      if (imageUrl) category.image = imageUrl;
    }
    if (name) category.name = name.trim();

    await category.save();
    res.status(200).json({ message: "Category updated successfully", success: true, category });
  } catch (error) {
    console.error("Error in updateCategory:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found", success: false });
    }
    res.status(200).json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error in deleteCategory:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};
