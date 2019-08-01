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

const options = {
  autoIndex: false,
  reconnectTries: 30,
  reconnectInterval: 500, 
  poolSize: 10,
  bufferMaxEntries: 0
}

const connectWithRetry = () => {
  console.log('MongoDB connection with retry');
  
  mongoose.connect("mongodb://mongo:27017/test", options).then(() => {
    console.log('MongoDB is connected');
  }).catch(err => {
    console.log(err);
    console.log('MongoDB connection unsuccessful, retry after 5 seconds.');
    setTimeout(connectWithRetry, 5000);
  });
}

connectWithRetry();

app.route("/feeds")
    .get(feedsRoute.getFeeds)
    .post(feedsRoute.postFeed);

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

module.exports = app;