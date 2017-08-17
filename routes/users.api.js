const {mongoose} = require('../server/db/mongoose');
const {User} = require('../server/models/user');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const router = express.Router();

router.use(bodyParser.json());

// POST route to create a new user

router.post('/', (request, response) => {
    const body = _.pick(request.body, ['email', 'password']);
    const newUser = new User(body);
    newUser.save()
    .then((user) => {
        console.log("New user is", user);
        response.send(user);
    })
    .catch((err) => {
        console.log("Error", err);
        response.status(400).send(err);
    });
});

module.exports = {
    usersRouter: router
};