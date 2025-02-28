const Joi = require("joi");

const validateCreateChildTask = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().optional(),
    status: Joi.string()
      .valid("Pending", "In Progress", "Completed")
      .default("Pending"),
    dueDate: Joi.date().optional(),
    priority: Joi.string().valid("Low", "Medium", "High").default("Medium"),
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

const validateUpdateChildTask = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).optional(),
    description: Joi.string().optional(),
    status: Joi.string()
      .valid("Pending", "In Progress", "Completed")
      .optional(),
    dueDate: Joi.date().optional(),
    priority: Joi.string().valid("Low", "Medium", "High").optional(),
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

const validateChildTaskParams = (req, res, next) => {
  const schema = Joi.object({
    mainTaskId: Joi.number().integer().required(),
    childTaskId: Joi.number().integer().required(),
  });

  const { error } = schema.validate(req.params);

  if (error) {
    return res.status(400).json({
      success: false,
      error: "Invalid data in request params.",
      message: error.details.map((obj) => {
        let key = obj.path[0];
        return { [key]: obj.message.replace(/"/g, "") };
      }),
    });
  } else {
    next();
  }
};

const validateChildTaskParamsMainTaskID = (req, res, next) => {
  const schema = Joi.object({
    mainTaskId: Joi.number().integer().required(),
  });

  const { error } = schema.validate(req.params);

  if (error) {
    return res.status(400).json({
      success: false,
      error: "Invalid data in request params.",
      message: error.details.map((obj) => {
        let key = obj.path[0];
        return { [key]: obj.message.replace(/"/g, "") };
      }),
    });
  } else {
    next();
  }
};

const validateChildTaskPaginationQuery = (req, res, next) => {
  const schema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).default(10),
  });

  const { error } = schema.validate(req.query);

  if (error) {
    return res.status(400).json({
      success: false,
      error: "Invalid data in request query.",
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
  validateCreateChildTask,
  validateUpdateChildTask,
  validateChildTaskParams,
  validateChildTaskParamsMainTaskID,
  validateChildTaskPaginationQuery,
};
