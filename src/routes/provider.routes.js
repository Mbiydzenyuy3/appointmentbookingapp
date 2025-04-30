//routes/provider.routes.js
import express from "express";
import { getAllProviders } from "../controllers/provider-controller.js";

const router = express.Router();

router.get("/", getAllProviders);

export default router;
