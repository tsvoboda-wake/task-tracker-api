const express = require('express');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();
const Task = require('../models/Task.js');

router.post('/api/tasks', authMiddleware, async (req, res) => {
  const userId = req.user.id; // Use the user object from the decoded token
  if (!userId) {
    return res.status(401).json({ message: 'Invalid token payload' });
  }
  try {
    const { title, description, completed } = req.body;

    const newTask = await Task.create({
      title,
      description,
      completed,
      user: userId
    });

    // task has a user object, so we can use that to find the user in the database
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message || 'Unable to create task' });
  }
});

router.get('/api/tasks', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Unable to fetch tasks' });
  }
});

router.put('/api/tasks/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  // Check which fields are present in the request body and only update those fields.
  const updates = {};
  if (req.body.title !== undefined) updates.title = req.body.title;
  if (req.body.description !== undefined)
    updates.description = req.body.description;
  if (req.body.completed !== undefined) updates.completed = req.body.completed;

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, updates, {
      new: true
    });

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message || 'Unable to update task' });
  }
});

router.delete('/api/tasks/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Unable to delete task' });
  }
});

module.exports = router;
