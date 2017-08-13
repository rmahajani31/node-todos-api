const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todos');
const {User} = require('./models/user');
const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

app.post('/todos', (request, response) => {
    console.log(request.body);
    const myTodo = new Todo({
        text: request.body.text
    });
    myTodo.save()
    .then((todo) => {
        console.log("Successfully saved todo", todo);
        response.send(todo);
    })
    .catch((err) => {
        console.log("Error saving todo");
        response.status(400).send(err);
    });
});

app.listen(port, () => {
    console.log("Started on port 3000...");
});