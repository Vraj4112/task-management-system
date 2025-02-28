const express = require("express");
const router = express.Router();
const controllers = require("./maintask_controllers");
const validators = require("./maintask_validators");
const childtask_controllers = require("./childtask_controllers");
const childtask_validators = require("./childtask_validators");

//all routes Main task
router.post("/", validators.validateCreateMainTask, controllers.createMainTask);
router.get("/", validators.validatePaginationQuery, controllers.getMainTasks);
router.get(
  "/:id",
  validators.validateMainTaskParams,
  controllers.getMainTaskById
);
router.put(
  "/:id",
  validators.validateMainTaskParams,
  validators.validateUpdateMainTask,
  controllers.updateMainTask
);
router.delete(
  "/:id",
  validators.validateMainTaskParams,
  controllers.deleteMainTask
);

//all routes Child task
router.post(
  "/:mainTaskId/child-tasks",
  childtask_validators.validateChildTaskParamsMainTaskID,
  childtask_validators.validateCreateChildTask,
  childtask_controllers.createChildTask
);
router.get(
  "/:mainTaskId/child-tasks",
  childtask_validators.validateChildTaskPaginationQuery,
  childtask_validators.validateChildTaskParamsMainTaskID,
  childtask_controllers.getChildTasks
);
router.put(
  "/:mainTaskId/child-tasks/:childTaskId",
  childtask_validators.validateChildTaskParams,
  childtask_validators.validateUpdateChildTask,
  childtask_controllers.updateChildTask
);
router.delete(
  "/:mainTaskId/child-tasks/:childTaskId",
  childtask_validators.validateChildTaskParams,
  childtask_controllers.deleteChildTask
);

module.exports = router;
