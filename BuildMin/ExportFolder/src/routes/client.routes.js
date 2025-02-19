import express from "express";
import { ClientController } from "../controllers/client.controller.js";

const router = express.Router();

router.get("/", ClientController)


export default router;    