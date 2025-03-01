const express = require("express");
const router = express.Router();
const maintask_controllers = require("./Main_Tasks/controllers");
const maintask_validators = require("./Main_Tasks/validators");
const childtask_controllers = require("./Child_Tasks/controllers");
const childtask_validators = require("./Child_Tasks/validators");

//All routes Main task
router
  .route("/")
  .post(
    maintask_validators.validateCreateMainTask,
    maintask_controllers.createMainTask
  )
  .get(
    maintask_validators.validatePaginationQuery,
    maintask_controllers.getMainTasks
  );

router
  .route("/:id")
  .get(
    maintask_validators.validateMainTaskParams,
    maintask_controllers.getMainTaskById
  )
  .put(
    maintask_validators.validateMainTaskParams,
    maintask_validators.validateUpdateMainTask,
    maintask_controllers.updateMainTask
  )
  .delete(
    maintask_validators.validateMainTaskParams,
    maintask_controllers.deleteMainTask
  );

//All routes Child task
router
  .route("/:mainTaskId/child-tasks")
  .post(
    childtask_validators.validateChildTaskParamsMainTaskID,
    childtask_validators.validateCreateChildTask,
    childtask_controllers.createChildTask
  )
  .get(
    childtask_validators.validateChildTaskPaginationQuery,
    childtask_validators.validateChildTaskParamsMainTaskID,
    childtask_controllers.getChildTasks
  );

router
  .route("/:mainTaskId/child-tasks/:childTaskId")
  .put(
    childtask_validators.validateChildTaskParams,
    childtask_validators.validateUpdateChildTask,
    childtask_controllers.updateChildTask
  )
  .delete(
    childtask_validators.validateChildTaskParams,
    childtask_controllers.deleteChildTask
  );

module.exports = router;
