require('dotenv').config();

const express = require('express');
const app = express();
const { PORT, JWT_SECRET, MONGO_URI } = process.env;
const connectDB = require('./config/db');

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
app.use('/', taskRoutes);

// Connect to database
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
