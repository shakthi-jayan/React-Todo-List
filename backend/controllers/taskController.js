import Task from "../models/taskModels.js";

export const addTask = async (req, res) => {
  const { title, description, status } = req.body;

  try {
    const addedTask = await Task.create({ title, description, status });
    return res.status(201).json(addedTask);
  } catch (err) {
    return res.status(500).json({
      message: "Failed to add task",
      error: err.message,
    });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    return res.status(200).json(tasks);
  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch tasks",
      error: err.message,
    });
  }
};

export const getTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json(task);
  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch task",
      error: err.message,
    });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true, runValidators: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json(updatedTask);
  } catch (err) {
    return res.status(500).json({
      message: "Failed to update task",
      error: err.message,
    });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to delete task",
      error: err.message,
    });
  }
};