const mongodb = require('mongodb');

const {MongoClient, ObjectID} = mongodb;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log("Unable to connect to local mongo server");
    }
    console.log("Connected to MongoDB Server");

    // const todosCollection = db.collection('Todos');
    // todosCollection.insertOne({
    //     text: "Wash Dishes",
    //     completed: "false"
    // }, (err, response) => {
    //     if (err) {
    //         return console.log("Error inserting document into collection Todos in database TodoApp");
    //     }
    //     console.log(JSON.stringify(response.ops, undefined, 2));
    // });

    const collection = db.collection('Users');

    collection.insertOne({
        name: 'Rishabh Mahajani',
        age: 20,
        location: 'Gaithersburg, Maryland'
    }, (err, response) => {
        if (err) {
            return console.log("Unable to insert document into Todos collection");
        }
        console.log("Inserted document into todos collection");

        console.log(response.ops[0]._id.getTimestamp());
    });

    db.close();
});