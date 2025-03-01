const MainTask = require("../../../database/models/maintask");

const createMainTask = async (req, res) => {
  try {
    const { title, description, status, dueDate, priority } = req.body;
    const mainTask = await MainTask.create({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json({ message: "task successfully created", mainTask });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getMainTasks = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const tasks = await MainTask.findAndCountAll({
      where: { userId: req.user.id },
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getMainTaskById = async (req, res) => {
  try {
    const task = await MainTask.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateMainTask = async (req, res) => {
  try {
    const task = await MainTask.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!task) return res.status(404).json({ error: "Task not found" });

    await task.update(req.body);
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteMainTask = async (req, res) => {
  try {
    const task = await MainTask.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!task) return res.status(404).json({ error: "Task not found" });

    await task.destroy();
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createMainTask,
  getMainTasks,
  getMainTaskById,
  updateMainTask,
  deleteMainTask,
};
