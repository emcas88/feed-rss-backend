let Feed = require('../models/feed');

function getFeeds(req, res) {

    let page = parseInt(req.query.page || 1);
    let limit = parseInt(req.query.limit || 100);
    
    Feed.find({})
        .skip(limit * (page - 1))
        .limit(limit)
        .exec((err, feeds) => {
            if (err) {
                res.send(err);
                return;
            }

-           res.json({items: feeds});
        });
};

function postFeed(req, res) {
    let feed = new Feed(req.body);

    console.log(req.body.url);

    feed.save((err, feed) => {
        if (err) {
            res.send(err);
            return;
        }

        res.status(201).json(feed);
    })
};

module.exports = { getFeeds, postFeed };
