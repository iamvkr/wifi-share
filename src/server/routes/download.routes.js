import express from "express";
import { DownloadController } from "../controllers/download.controller.js";

const router = express.Router();

router.get("/:filename", DownloadController)

export default router;