const Joi=require('joi');


const studentValidationSchema=Joi.object({
  regNo:Joi.string()
  .alphanum()
  .min(3)
  .max(15)
  .required()
   .messages({
    'string.empty':'Registration number is required',
    'any.required':'Registration number is required',
    'string.min':'Registration number must be at least 3 characters long',
    'string.max':'Registration number must be at most 15 characters long',
    'string.alphanum':'Registration number must be alphanumeric'
   }),
   name: Joi.string()
   .trim()
   .min(3)
   .max(50)
   .required()
   .messages({
     "string.empty": "Name is required",
     "string.min": "Name must be at least 3 characters long",
     "string.max": "Name must not exceed 50 characters",
   }),
   class: Joi.string()
   .trim()
   .required()
   .messages({
     "string.empty": "Class is required",
     "any.only": "Invalid class value",
   }),
   rollNo: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "Roll number must be a number",
      "number.positive": "Roll number must be a positive integer",
      "number.empty": "Roll number is required",
    }),

  contact: Joi.string()
    .pattern(/^[6-9]\d{9}$/)
    .required()
    .messages({
      "string.empty": "Contact number is required",
      "string.pattern.base": "Invalid contact number (must be 10 digits and start with 6-9)",
    }),

  status: Joi.boolean().default(true),

})
const validateStudent = (data) => studentValidationSchema.validate(data, { abortEarly: false });
module.exports=validateStudent