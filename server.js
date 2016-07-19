'use strict';

let express = require('express');

class User {
    constructor(name) {
        // Every user needs a name
        this.username = name;
    }

};

class Storage {
    constructor() {
        this.items = [];
        this.id = 1;
    }

    add(name) {
        let item = { name: name, id: this.id };
        this.items.push(item);
        this.id += 1;
        return item;
    }

    // Helper function that gets the index of the requested item
    // in the items array for updating or deleting the item.
    static getIndex(id) {
        return function findId(item, index, array) {
            return item.id == id;
        }
    }

    del(id) {
        // Find the index of the item in the array
        let index = this.items.findIndex(Storage.getIndex(id));
        if (index < 0) {
            return undefined;
        }
        // Get the item
        let item = this.items[index];
        // Remove the item
        this.items.splice(index, 1);
        return item;
    }

    put(name, id) {
        // Find the index of the item in the array
        let index = this.items.findIndex(Storage.getIndex(id));
        if (index < 0) {
            return undefined;
        }
        // Get the item
        let item = this.items[index];
        // Update the name attribute
        item.name = name;
        return item;
    }

};

let user = new User("joe");
let storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

user.list = storage.items;

let app = express();
app.use(express.static('public'));

// This is how I understand the documentation vs. the instructions
// Rather than using another parameter in each method call
// i.e., app.post('/items', bodyParser.json(), function(req, res) ...),
// the parser is added to the express server instance.
// How does express know when to use it?
let bodyParser = require('body-parser');
app.use(bodyParser.json());

// Retrieve and send the list of items
app.get('/items', function (req, res) {
    res.json(storage.items);
});

// Retrieve the user and the list
app.get('/users/:name', function (req, res) {
    let username = req.params.name;
    res.json(user);
});

// Add a new item to the list
app.post('/items', function (req, res) {
    // Provided as an example but doesn't work for me
    // I had to include the specific property
    if (!req.body.name) {
        return res.status(400).json('The item you entered is blank');
    }

    let item = storage.add(req.body.name);
    res.status(201).json(item);
});

// Remove the selected item from the list
app.delete('/items/:id', function (req, res) {
    let body = req.body;
    // The error handling is complicated here since a missing
    // parameter appears to be given a value of zero, therefore it
    // deletes the first item, but reports a general error stating
    // "Cannot DELETE /items/" which is close, but not exactly correct.
    // Checking the id parameter to see if it's less than one
    // and starting the id at one (see constructor above)
    // prevents the unexpected delete action.
    // Now how to make the error message more precise?
    if (body.id < 1) {
        return res.status(400).json('Missing item id number');
    }

    let item = storage.del(body.id);
    // This error handling works
    if (!item) {
        return res.status(400).json(
            'Cannot find the item you requested');
    }

    res.status(200).json(item);

});

// Update the selected item in the list
app.put('/items/:id', function (req, res) {
    let id = req.params.id;
    let body = req.body;

    // If the body is empty or one of the parameters is missing...
    if (!body || !body.name || !body.id) {
        return res.status(400).json(
            'You forgot to include the item to update!');
    }

    let item = storage.put(req.body.name, req.body.id);

    // If the item doesn't exist...
    if (!item) {
        return res.status(400).json(
            "Cannot update an item not in the list");
    }

    res.status(200).json(item);

});

app.put('/users/:name', function (req, res) {
    let username = req.params.name;
    user.username = username;
    res.status(200).json(user);
});

// Testing out the documented error handling function
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(
        'Big mistake buddy! You just wait until I get a hold of you!'
    );
});

app.listen(process.env.PORT || 8080);

exports.app = app;
exports.storage = storage;
