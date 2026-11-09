import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

const connectCloudinary = async () => {
  try {
    if (
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
    ) {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      console.log("Cloudinary configured successfully");
    } else {
      console.log("Cloudinary credentials not provided; local static uploads fallback active");
    }
  } catch (error) {
    console.log("Error configuring Cloudinary:", error.message);
  }
};

export default connectCloudinary;
