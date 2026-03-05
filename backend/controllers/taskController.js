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

git config --global user.name "Shakthi Jayan J"
git config --global user.email "shakthijayan19@gmail.com"
