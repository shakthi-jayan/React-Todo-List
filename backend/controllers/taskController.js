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