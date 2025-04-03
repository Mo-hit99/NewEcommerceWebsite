import dotenv from "dotenv";
dotenv.config();
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // The name of the folder in Cloudinary
    format: async (req, file) => {
      const fileType = file.mimetype.split("/")[1];
      return ["jpeg", "png", "jpg", "gif"].includes(fileType)
        ? fileType
        : "jpeg";
    },
    public_id: (req, file) => {
      `${Date.now()}-${file.originalname.split(".")[0]}`;
    },
  },
});

const upload = multer({ storage: storage });
export default upload;

// Create multer instance

// const Id=crypto.randomUUID();

// const storage = multer.diskStorage({
//     destination: './uploads'
//     ,
//     filename: function (req, file, cb) {
//       cb(null, Id + "_" + file.originalname)
//     }
//   })
  
//   const upload = multer({ storage: storage })

//   export default upload;