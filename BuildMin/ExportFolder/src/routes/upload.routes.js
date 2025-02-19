import express from "express";
import { UploadController } from "../controllers/upload.controller.js";
import multer from "multer";

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: "public/uploads/",
    // destination: (req, file, cb) => {
    //     cb(null, "public/uploads/");
    // },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        cb(null, timestamp + "-" + file.originalname);
        req.savedFileName = timestamp + "-" + file.originalname;
    },
});

const upload = multer({ storage });

router.post("/",upload.single("file"), UploadController)

export default router; 