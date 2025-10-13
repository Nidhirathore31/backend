const express = require('express');
const router = express.Router();
const auth = require('../middleware/Auth');
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require('../controllers/TaskControllers');

// All routes are protected
router.post('/', auth, createTask);          // Create
router.get('/', auth, getTasks);             // Read
router.put('/:id', auth, updateTask);        // Update
router.delete('/:id', auth, deleteTask);     // Delete

module.exports = router;
