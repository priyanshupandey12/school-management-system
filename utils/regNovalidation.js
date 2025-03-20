const Joi = require("joi");


const regNoSchema = Joi.object({
  regNo: Joi.string()
    .alphanum()
    .min(3)
    .max(15)
    .required()
    .messages({
      "string.empty": "Registration number is required",
      "string.alphanum": "Registration number must be alphanumeric",
      "string.min": "Registration number must be at least 3 characters long",
      "string.max": "Registration number must be at most 15 characters long"
    })
});

module.exports = regNoSchema;