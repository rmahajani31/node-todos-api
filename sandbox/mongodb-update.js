const mongodb = require('mongodb');

const {MongoClient, ObjectID} = mongodb;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log("Unable to connect to local mongo server");
    }
    console.log("Connected to MongoDB Server");

    // const collection = db.collection('Todos');

    // collection.findOneAndUpdate({
    //     _id: new ObjectID("598fc7dfb5b88d742f291854")
    // }, {
    //     $set: {
    //         complete: true 
    //     }
    // }, {
    //     returnOriginal: false
    // })
    // .then((response) => {
    //     console.log(response);
    // })
    // .catch((err) => {
    //     console.log(err);
    // });

    const collection = db.collection('Users');

    collection.findOneAndUpdate({
        _id: new ObjectID("598fc204b5b88d742f2914ed")
    }, {
       $set: {
           name: "Rishabh"
       },
       $inc: {
           age: 1
       } 
    }, {
        returnOriginal: false
    })
    .then((response) => {
        console.log("The new name of the document has been updated to", response.value.name);
    })
    .catch((err) => {
        console.log("Error", err);
    })

    db.close();
});