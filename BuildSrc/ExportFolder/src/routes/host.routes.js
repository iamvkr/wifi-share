import express from "express";
import { HostController } from "../controllers/host.controller.js";
import { validateHost } from "../middlewares/validateHost.js";

const router = express.Router();

router.get("/", validateHost, HostController)

export default router; 