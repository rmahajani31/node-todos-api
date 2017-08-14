const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todos');
const {ObjectID} = require('mongodb');

Todo.remove({text: "Go to gym"})
.then((result) => {
    console.log("Documents removed are", result);
})
.catch((err) => {
    console.log("Error", err);
});

Todo.findOneAndRemove({text: "Do Laundry"})
.then((doc) => {
    console.log("Removed document is", doc);
})
.catch((err) => {
    console.log("Error", err);
});

Todo.findByIdAndRemove("5990bc7dd60478c45590e8fb")
.then((doc) => {
    console.log("Removed document is", doc);
})
.catch((err) => {
    console.log("Error", err);
});
