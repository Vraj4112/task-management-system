const express = require("express");
const router = express.Router();
const maintask_controllers = require("./Main_Tasks/controllers");
const maintask_validators = require("./Main_Tasks/validators");
const childtask_controllers = require("./Child_Tasks/controllers");
const childtask_validators = require("./Child_Tasks/validators");

//All routes Main task
router.post(
  "/",
  maintask_validators.validateCreateMainTask,
  maintask_controllers.createMainTask
);
router.get(
  "/",
  maintask_validators.validatePaginationQuery,
  maintask_controllers.getMainTasks
);
router.get(
  "/:id",
  maintask_validators.validateMainTaskParams,
  maintask_controllers.getMainTaskById
);
router.put(
  "/:id",
  maintask_validators.validateMainTaskParams,
  maintask_validators.validateUpdateMainTask,
  maintask_controllers.updateMainTask
);
router.delete(
  "/:id",
  maintask_validators.validateMainTaskParams,
  maintask_controllers.deleteMainTask
);

//All routes Child task
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
