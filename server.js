const express = require('express');
const mongoose = require('mongoose');
const employeeRoutes = require('./employees');

const app = express();
const port = 3001; // Use a different port for the backend

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/employee_db', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(express.json());

// Routes
app.use('/api/employees', employeeRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});