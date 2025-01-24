
const express = require("express");
const router = express.Router();
const Task = require("../model/task");

router.post("/create", async (req, res) => {
  const { name, description } = req.body;
  try {
    const task = new Task({ name, description });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Error creating task" });
  }
});

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

router.put("/:id/status", async (req, res) => {
  const { status } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: "Error updating task status" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task" });
  }
});

module.exports = router;
