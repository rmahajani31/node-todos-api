const mongodb = require('mongodb');

const {MongoClient, ObjectID} = mongodb;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log("Unable to connect to local mongo server");
    }
    console.log("Connected to MongoDB Server");

    // const collection = db.collection('Todos');

    // const mongoData = collection.find({})
    // .count((err, count) => {
    //     if (err) {
    //         return console.log("Error counting documents");
    //     }
    //     console.log("Number of documents is ", count);
    // });

    // mongoData.then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // })
    // .catch((err) => {
    //     console.log("Error ", err);
    // });

    const collection = db.collection('Users');

    const mongoCursor = collection.find({name: "Rishabh Mahajani"});

    mongoCursor.toArray()
    .then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    })
    .catch((err) => {
        console.log("Error", err);
    });

    mongoCursor.count((err, count) => {
        if (err) {
            return console.log("Error", err);
        }
        console.log("Number of documents retrieved is", count);
    });

    db.close();
});