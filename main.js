const express = require('express')
const app = express()
var mongoose = require('mongoose');
var Feed = require('./models/feed');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;
const MONGO_DB_PORT = process.env.MONGO_DB_PORT || 27017;
const MONGO_ROOT_USERNAME = encodeURIComponent(process.env.MONGO_ROOT_USERNAME || 'mongoadmin');
const MONGO_ROOT_PASSWORD = encodeURIComponent(process.env.MONGO_ROOT_PASSWORD || 'secret');

mongoose.connect(`mongodb://${MONGO_ROOT_USERNAME}:${MONGO_ROOT_PASSWORD}@localhost:${MONGO_DB_PORT}/?authMechanism=DEFAULT`);

app.get('/feeds', (req, res) => {

    let page = parseInt(req.query.page || 1);
    let limit = parseInt(req.query.limit || 100);

    Feed.find({})
        .skip(limit * (page - 1))
        .limit(limit)
        .exec((err, feeds) => {
            if (err) throw err;

            res.setHeader('Content-Type', 'application/json');
-           res.end(JSON.stringify({data: feeds}));
        });
});

app.post('/feeds', (req, res) => {

    var feed = new Feed();
    feed.name = req.body.name;

    feed.save(err => {
        if (err) throw err

        res.setHeader('Content-Type', 'application/json');
        res.status(201).end(JSON.stringify(feed));
    })
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`))
