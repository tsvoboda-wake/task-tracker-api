require('dotenv').config();

const express = require('express');
const app = express();
const { PORT, JWT_SECRET, MONGO_URI } = process.env;
const mongoose = require('mongoose');

// TODO: create Mongo DB
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Database connection error:', err));

app.use(express.json());

// Health check route
app.get('/api/health', (req, res) => {
  res.send('Task Tracker is running');
});

// Import routes
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

// Connect auth routes
app.use('/', authRoutes);

  
// Connect task routes
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});