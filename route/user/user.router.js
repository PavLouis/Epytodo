const { createUser, getUsersById, getUsers, updateUser, getUsersTasks, deleteUser, login } = require('./user.controller');
const router = require('express').Router();
const { checkToken } = require('../auth/auth')

router.post('/register', createUser);
router.post('/login', login);
router.get('/user/todos', getUsersTasks)
router.get('/user/:id', checkToken, getUsersById);
router.get('/user', checkToken, getUsers);
router.put('/user/:id', checkToken, updateUser);
router.delete('/user/:id', checkToken, deleteUser);

module.exports = router;