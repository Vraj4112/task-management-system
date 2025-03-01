const MainTask = require("../../../database/models/maintask");
const ChildTask = require("../../../database/models/childtask");

const createChildTask = async (req, res) => {
  try {
    const { title, description, status, dueDate, priority } = req.body;
    const mainTaskId = req.params.mainTaskId;
    const mainTask = await MainTask.findByPk(mainTaskId);
    if (!mainTask)
      return res.status(404).json({ error: "Main task not found" });

    const childTask = await ChildTask.create({
      title,
      description,
      status,
      dueDate,
      priority,
      mainTaskId,
    });
    res.status(201).json(childTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getChildTasks = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const tasks = await ChildTask.findAll({
      where: { mainTaskId: req.params.mainTaskId },
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateChildTask = async (req, res) => {
  try {
    const task = await ChildTask.findOne({
      where: { id: req.params.childTaskId, mainTaskId: req.params.mainTaskId },
    });
    if (!task) return res.status(404).json({ error: "Child task not found" });

    await task.update(req.body);
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteChildTask = async (req, res) => {
  try {
    const task = await ChildTask.findOne({
      where: { id: req.params.childTaskId, mainTaskId: req.params.mainTaskId },
    });
    if (!task) return res.status(404).json({ error: "Child task not found" });

    await task.destroy();
    res.json({ message: "Child task deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createChildTask,
  getChildTasks,
  updateChildTask,
  deleteChildTask,
};
