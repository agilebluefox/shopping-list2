'use strict';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server.js');

let should = chai.should();
let app = server.app;
let storage = server.storage;

chai.use(chaiHttp);

describe('Shopping List', function () {
    it('should list items on GET', function (done) {
        chai.request(app)
            .get('/items')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('id');
                res.body[0].should.have.property('name');
                res.body[0].id.should.be.a('number');
                res.body[0].name.should.be.a('string');
                res.body[0].name.should.equal(
                    'Broad beans');
                res.body[1].name.should.equal('Tomatoes');
                res.body[2].name.should.equal('Peppers');
                done();
            });
    });
    it('should add an item on post', function (done) {
        chai.request(app)
            .post('/items')
            .send({ 'name': 'Kale' })
            .end(function (err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('id');
                res.body.name.should.be.a('string');
                res.body.id.should.be.a('number');
                res.body.name.should.equal('Kale');
                storage.items.should.be.a('array');
                storage.items.should.have.length(4);
                storage.items[3].should.be.a('object');
                storage.items[3].should.have.property('id');
                storage.items[3].should.have.property(
                    'name');
                storage.items[3].id.should.be.a('number');
                storage.items[3].name.should.be.a('string');
                storage.items[3].name.should.equal('Kale');
                done();
            });
    });
    it(
        'should report an error if the item name is missing when adding an item',
        function (done) {
            chai.request(app)
                .post('/items')
                .send({})
                .end(function (err, res) {
                    res.should.have.status(400);
                    res.should.be.json;
                    storage.items.should.be.a('array');
                    storage.items.should.have.length(4);
                    done();
                });
        });
    it('should edit an item on put', function (done) {
        chai.request(app)
            .put('/items/1')
            .send({ 'id': 1, 'name': 'Milk' })
            .end(function (err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('id');
                res.body.name.should.be.a('string');
                res.body.id.should.be.a('number');
                res.body.name.should.equal('Milk');
                storage.items.should.be.a('array');
                storage.items.should.have.length(4);
                storage.items[0].should.be.a('object');
                storage.items[0].should.have.property('id');
                storage.items[0].should.have.property(
                    'name');
                storage.items[0].id.should.be.a('number');
                storage.items[0].name.should.be.a('string');
                storage.items[0].name.should.equal('Milk');
                done();
            });
    });
    it(
        'should report an error when updating an item that does not exist',
        function (done) {
            chai.request(app)
                .put('/items/23')
                .send({ 'id': 23, 'name': 'Unknown' })
                .end(function (err, res) {
                    res.should.have.status(400);
                    res.should.be.json;
                    storage.items.should.be.a('array');
                    storage.items.should.have.length(4);
                    done();
                });
        });
    it(
        'should report an error when the update is missing the name or id property',
        function (done) {
            chai.request(app)
                .put('/items/1')
                .send({ 'id': 1 })
                .end(function (err, res) {
                    res.should.have.status(400);
                    res.should.be.json;
                    storage.items.should.be.a('array');
                    storage.items.should.have.length(4);
                    done();
                });
        });
    it('should delete an item on delete', function (done) {
        chai.request(app)
            .delete('/items/3')
            .send({ 'id': 3 })
            .end(function (err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('id');
                res.body.name.should.be.a('string');
                res.body.id.should.be.a('number');
                res.body.id.should.equal(3);
                res.body.name.should.equal('Peppers');
                storage.items.should.be.a('array');
                storage.items.should.have.length(3);
                done();
            });
    });
    it(
        'should report an error when deleting an item that does not exist',
        function (done) {
            chai.request(app)
                .delete('/items/23')
                .send({ 'id': 23 })
                .end(function (err, res) {
                    res.should.be.json;
                    res.should.have.status(400);
                    storage.items.should.be.a('array');
                    storage.items.should.have.length(3);
                    done();
                });
        });
    it('should not delete any items if the id is missing',
        function (done) {
            chai.request(app)
                .delete('/items/2')
                .send({ 'id': '' })
                .end(function (err, res) {
                    res.should.have.status(400);
                    res.should.be.json;
                    storage.items.should.be.a('array');
                    storage.items.should.have.length(3);
                    done();
                });
        });
});
