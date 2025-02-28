const Joi = require("joi");

const validateRegister = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("ADMIN", "USER").default("USER"),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      error: "Invalid data in request json.",
      message: error.details.map((obj) => {
        let key = obj.path[0];
        return { [key]: obj.message.replace(/"/g, "") };
      }),
    });
  } else {
    next();
  }
};
const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      error: "Invalid data in request json.",
      message: error.details.map((obj) => {
        let key = obj.path[0];
        return { [key]: obj.message.replace(/"/g, "") };
      }),
    });
  } else {
    next();
  }
};

module.exports = {
  validateRegister,
  validateLogin,
};
