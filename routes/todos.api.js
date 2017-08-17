const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todos');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const router = express.Router();

router.use(bodyParser.json());

router.post('/', (request, response) => {
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

router.get('/', (request, response) => {
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

router.get('/:id', (request, response) => {
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

router.delete('/:id', (request, response) => {
    const id = request.params.id;

    if(!ObjectID.isValid(id)) {
        return response.status(404).send({"Error": "Invalid Id"});
    }

    Todo.findByIdAndRemove(id)
    .then((todo) => {
        if(!todo) {
            return response.status(404).send({"Error": "No Todo corresponding to this id"});
        }
        response.send(todo);
    })
    .catch((err) => {
        response.status(400).send(err);
    }); 
});

router.patch('/:id', (request, response) => {
    const id = request.params.id;
    if (!ObjectID.isValid(id)) {
        return response.status(404).send({"Error": "Invalid Id"});
    }

    const body = _.pick(request.body, ['text', 'completed']);

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    })
    .then((todo) => {
        if (!todo) {
            return response.status(404).send({"Error": "No Todo corresponding to this id"});
        }
        response.send(todo);
    })
    .catch((err) => {
        response.status(400).send(err);
    });
});

module.exports = {
    todosRouter: router
};