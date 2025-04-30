// schemas/slot.schema.js
import Joi from "joi";

export const slotSchema = Joi.object({
  start_time: Joi.date().iso().required(),
  end_time: Joi.date().iso().required(),
});
