const express = require('express');
const {todosRouter} = require('../routes/todos.api');
const {usersRouter} = require('../routes/users.api');

const port = process.env.PORT || 3000;

const app = express();

app.use('/todos', todosRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Started on port ${port}...`);
});