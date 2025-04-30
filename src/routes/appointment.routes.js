// routes/appointment.routes.js
import express from "express";
import {
  bookAppointment,
  getMyAppointments,
  getProviderAppointments,
  cancelAppointment,
} from "../controllers/appointment-controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { bookAppointmentSchema } from "../schemas/appointment.schema.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  validate(bookAppointmentSchema),
  bookAppointment
);
router.get("/me", authenticate, getMyAppointments);
router.get("/provider", authenticate, getProviderAppointments);
router.delete("/:id", authenticate, cancelAppointment);

export default router;
