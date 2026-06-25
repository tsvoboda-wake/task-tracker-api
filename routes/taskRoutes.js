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
    console.log('req.user:', req.user);
    console.log('tasks found:', tasks);
    console.log('task count in DB:', await Task.countDocuments());
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Unable to fetch tasks' });
  }
});

// PUT /api/tasks/:id
// DELETE /api/tasks/:id

module.exports = router;
