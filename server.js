const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let feedsRoute = require('./routes/feed');

const PORT = process.env.PORT || 3001;
const MONGO_DB_PORT = process.env.MONGO_DB_PORT || 27017;
const MONGO_ROOT_USERNAME = encodeURIComponent(process.env.MONGO_ROOT_USERNAME || 'mongoadmin');
const MONGO_ROOT_PASSWORD = encodeURIComponent(process.env.MONGO_ROOT_PASSWORD || 'secret');

let options = { 
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } 
  }; 

mongoose.connect(`mongodb://${MONGO_ROOT_USERNAME}:${MONGO_ROOT_PASSWORD}@localhost:${MONGO_DB_PORT}/?authMechanism=DEFAULT`, options);

app.route("/feeds")
    .get(feedsRoute.getFeeds)
    .post(feedsRoute.postFeed);


app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

module.exports = app;
