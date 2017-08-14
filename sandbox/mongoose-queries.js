const {ObjectID} = require('mongodb');
const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todos');
const {User} = require('../server/models/user');

if (!ObjectID.isValid("5990c4b03b4d8fc76bb0adf2")) {
    console.log("Invalid Id");
}

// Todo.find({_id: "5990c766341531c892811b74"})
// .then((todos) => {
//     console.log("Todos", todos);
// });

// Todo.findOne({_id: "5990c766341531c892811b74"})
// .then((todo) => {
//     console.log("Todo", todo);
// });

// Todo.findById("5990c766341531c892811b74")
// .then((todo) => {
//     console.log("Todo", todo);
// });

User.findById("5990c4b03b4d8fc76bb0adf2")
.then((todo) => {
    if(!todo) {
       return console.log("Id not found");
    }
    console.log("Todo", todo);
})
.catch((err) => {
    console.log("Error", err);
});