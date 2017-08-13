const mongodb = require('mongodb');

const {MongoClient, ObjectID} = mongodb;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log("Unable to connect to local mongo server");
    }
    console.log("Connected to MongoDB Server");

    // const collection = db.collection('Todos');
    // //deleteMany
    // collection.deleteMany({text: "Eat Lunch"})
    // .then((response) => {
    //     console.log("Documents successfully deleted", response);
    // })
    // .catch((error) => {
    //     console.log("Error", err);
    // });

    // //deleteOne
    // collection.deleteOne({text: "Eat Lunch"})
    // .then((response) => {
    //     console.log("Documents successfully deleted", response);
    // })
    // .catch((err) => {
    //     console.log("Error", err);
    // });

    // //findOneAndDelete
    // collection.findOneAndDelete({completed: false})
    // .then((response) => {
    //     console.log("Response is", response);
    // })
    // .catch((err) => {
    //     console.log("Error", err);
    // });

    const collection = db.collection('Users');

    collection.deleteMany({name: 'Rishabh Mahajani'})
    .then((response) => {
        console.log("Documents deleted successfully");
    })
    .catch((err) => {
        console.log("Error encountered", err);
    });

    collection.findOneAndDelete({_id: new ObjectID("598fc1e9b5b88d742f2914dd")})
    .then((response) => {
        console.log(`You have deleted the document corressponding to ${response.value.name}`);
    })
    .catch((err) => {
        console.log("Error encountered", err);
    });

    db.close();
});