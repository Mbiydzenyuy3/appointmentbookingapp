//schemas/appointment.schema.js
import Joi from "joi";

export const bookAppointmentSchema = Joi.object({
  slot_id: Joi.number().required(),
});
