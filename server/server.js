const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todos');
const {User} = require('./models/user');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

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

app.get('/todos', (request, response) => {
    Todo.find()
    .then((todos) => {
        console.log("Successfully returned todos");
        response.send({todos});
    })
    .catch((err) => {
        console.log("Error");
        response.status(400).send(err);
    });
});

app.get('/todos/:id', (request, response) => {
    const id = request.params.id;
    console.log(id);
    if (!ObjectID.isValid(id)) {
        console.log("Invalid");
        response.status(404).send({"error": "Invalid id"});
    }
    else {
        Todo.findById(id)
        .then((todo) => {
            if (!todo) {
                response.status(404).send({"error": "No Todo corresponding to this id"});
            }
            response.send(todo);
        })
        .catch((err) => {
            console.log("sending error message");
            response.status(400).send(err);
        });
    }
});

app.listen(port, () => {
    console.log(`Started on port ${port}...`);
});