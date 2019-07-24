const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const PORT = process.env.PORT || 3001;
const MONGO_DB_PORT = process.env.MONGO_DB_PORT || 27017;
const MONGO_ROOT_USERNAME = encodeURIComponent(process.env.MONGO_ROOT_USERNAME || 'mongoadmin');
const MONGO_ROOT_PASSWORD = encodeURIComponent(process.env.MONGO_ROOT_PASSWORD || 'secret');

app.get('/feeds', (req, res) => {

    const url = `mongodb://${MONGO_ROOT_USERNAME}:${MONGO_ROOT_PASSWORD}@localhost:${MONGO_DB_PORT}/?authMechanism=DEFAULT`;
    const client = new MongoClient(url);

    client.connect(err => {

        if (err)
            throw err;

        let db = client.db("feeds_db");
        
        db.collection('names').find().toArray((err, docs) => {

            if (err)
                throw err;
            
            console.log(docs);

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({data: docs}));
            
        });
        
        client.close();
    });

});

app.post('/feeds', (req, res) => {

    let newFeed = {
        name: req.body.name 
    };

    const url = `mongodb://${MONGO_ROOT_USERNAME}:${MONGO_ROOT_PASSWORD}@localhost:27017/?authMechanism=DEFAULT`;
    const client = new MongoClient(url);

    client.connect(err => {

        if (err)
            throw err;

        let db = client.db("feeds_db");

        db.collection('names').insert(newFeed);

        // Wait for a second before finishing up, to ensure we have written the item to disk
        setTimeout(() => {

            // Fetch the document
            db.collection('names').findOne({name: newFeed.name}, (err, item) => {
                if (err)
                    throw err;

                res.setHeader('Content-Type', 'application/json');
                res.status(201).end(JSON.stringify(item));

                client.close();
            })
        }, 100);
    });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`))

