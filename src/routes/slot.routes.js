//routes/slot.routes.js
import express from "express";
import {
  createTimeSlot,
  getProviderSlots,
  getAvailableSlots,
} from "../controllers/slot-controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { slotSchema } from "../schemas/slot.schema.js";

const router = express.Router();

router.post("/", authenticate, validate(slotSchema), createTimeSlot);
router.get("/mine", authenticate, getProviderSlots);
router.get("/available/:providerId", authenticate, getAvailableSlots);

export default router;
