// GET /api/tasks
// POST /api/tasks
// PUT /api/tasks/:id
// DELETE /api/tasks/:id

const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/api/tasks', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });
    res.status(200).json({ message: 'Tasks retrieved successfully', tasks });
  } catch (error) {
    console.error('Error retrieving tasks:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/api/tasks', authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;
 
    const newTask = new Task({
      title,
      description,
      userId: req.user._id
    });
 
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(400).json({ message: 'Unable to create task' });
  }
});

router.put('/api/tasks/:id', authMiddleware, async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
 
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
 
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: 'Unable to update task' });
  }
});

router.delete('/api/tasks/:id', authMiddleware, async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
 
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
 
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Unable to delete task' });
  }
});

module.exports = router;