const mongoose = require('mongoose');
 
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
  user: ObjectId
});

const Task = mongoose.model('Task', taskSchema);
