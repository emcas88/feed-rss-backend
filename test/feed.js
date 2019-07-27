let mongoose = require("mongoose");
let Feed = require('../models/feed');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Feeds', () => {
    beforeEach('beforeEach', (done) => {
        Feed.remove({}, (err) => { 
           done();
        });        
    });

    describe('/GET', () => {
        beforeEach('before', (done) => {

            let arrayNames = ['url1', 'url2', 'url3', 'url4', 'url5', 'url6'];
            let feeds = arrayNames.map(currentUrl => new Feed({url: currentUrl}));

            Feed.insertMany(feeds, (err, docs) => { 
                done();
            });
        });
            
        it('it should GET all the feeds', (done) => {
            chai.request(server)
                .get('/feeds')
                .end((err, res) => {

                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.items.should.be.a('array');
                    res.body.items.length.should.be.eql(6);

                    done();
                });
        });

        it('it should GET all the feeds with pagination', (done) => {
            chai.request(server)
                .get('/feeds?page=2&limit=3')
                .end((err, res) => {

                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.items.should.be.a('array');
                    res.body.items.length.should.be.eql(3);

                    res.body.items[0].url.should.equal('url4');
                    res.body.items[1].url.should.equal('url5');
                    res.body.items[2].url.should.equal('url6');

                    done();
                });
        });
    });

    describe('/POST', () => {

        it('it should POST a feed', (done) => {

            let feedPayload = {
                url: "url"
            }

            chai.request(server)
                .post('/feeds')
                .send(feedPayload)
                .end((err, res) => {
                    
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.url.should.be.a('string');
                    res.body.url.should.equal('url');

                    done();
                });
        });
    });
  

});