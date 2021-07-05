const { create_tasks , getTodo, getTasksById, updateTask, deleteTask } = require('./todo.controller');
const router = require('express').Router();
const { checkToken } = require('../auth/auth')

router.post('/todo', checkToken, create_tasks);
router.get('/todo/:id', checkToken,  getTasksById);
router.get('/todo', checkToken, getTodo);
router.put('/todo/:id', checkToken,  updateTask);
router.delete('/todo/:id', checkToken,  deleteTask);

module.exports = router;