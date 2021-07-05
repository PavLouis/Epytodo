require('./config/close.db');
const express = require('express');
const app = express();
const port = 8080;
const userRouter = require('./route/user/user.router');
const todoRouter = require('./route/todo/todo.router');

app.use(express.json())

app.use('/', userRouter);
app.use('/', todoRouter);

app.listen(port, () => {
  console.log(`Server listen at http://localhost:${port}`);
})  

module.exports = app;