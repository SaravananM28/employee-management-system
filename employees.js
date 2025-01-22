const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define the Employee model
const employeeSchema = new mongoose.Schema({
  empId: String,
  name: String,
  position: String,
  salary: Number
});

const Employee = mongoose.model('Employee', employeeSchema);

// GET all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees' });
  }
});

// GET employee by ID
router.get('/:empId', async (req, res) => {
  try {
    const employee = await Employee.findOne({ empId: req.params.empId });
    if (!employee) {
      res.status(404).json({ message: 'Employee not found' });
    } else {
      res.json(employee);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee' });
  }
});

// POST create new employee
router.post('/', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error creating employee' });
  }
});

// PUT update employee
router.put('/:empId', async (req, res) => {
  try {
    const employee = await Employee.findOneAndUpdate({ empId: req.params.empId }, req.body, { new: true });
    if (!employee) {
      res.status(404).json({ message: 'Employee not found' });
    } else {
      res.json(employee);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee' });
  }
});

// DELETE employee
router.delete('/:empId', async (req, res) => {
  try {
    await Employee.findOneAndDelete({ empId: req.params.empId });
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee' });
  }
});

module.exports = router;