import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import axios from 'axios';
import { Readable } from 'stream';

dotenv.config();

// Ensure env variables are present
if (!process.env.CLOUD_NAME || !process.env.API_KEY || !process.env.API_SECRET) {
  throw new Error("Cloudinary environment variables are missing.");
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Upload function
async function uploadToCloud(imageUrl: string): Promise<string> {
  try {
    // Download image as binary data
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data as ArrayBuffer);

    // Return a promise that resolves after uploading
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'discord-images' }, // 🔹 Removed extra space
        (error, result) => {
          if (error || !result) return reject(error);
          resolve(result.secure_url);
        }
      );

      Readable.from(buffer).pipe(uploadStream);
    });
  } catch (err) {
    console.error('Upload to Cloudinary failed:', err);
    throw err;
  }
}

export default uploadToCloud;
