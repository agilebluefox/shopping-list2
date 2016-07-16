var express = require('express');
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

var Storage = function () {
    this.items = [];
    this.id = 0;
};

Storage.prototype.add = function (name) {
    var item = { name: name, id: this.id };
    this.items.push(item);
    this.id += 1;
    return item;
};

// Method to delete an item from the list
Storage.prototype.del = function (id) {
    // Find the index of the item in the array
    var index = this.items.findIndex(getIndex(id));
    // Get the item
    var item = this.items[index];
    // Remove the item
    this.items.splice(index, 1);
    return item;
};

// Method to update an item in the list
Storage.prototype.put = function (name, id) {
    // Find the index of the item in the array
    var index = this.items.findIndex(getIndex(id));
    // Get the item
    var item = this.items[index];
    // Update the name attribute
    item.name = name;
    return item;
};

// Helper function - Good time to use a closure?
// I need to find the index of the item object stored in the array
// so I can remove the item or update the attributes.
function getIndex(id) {
    return function (item, index, array) {
        if (item.id == id) {
            return index;
        }
    };
};

var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();
app.use(express.static('public'));

// Retrieve and send the list of items
app.get('/items', function (req, res) {
    res.json(storage.items);
});

// Add a new item to the list
app.post('/items', jsonParser, function (req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }

    var item = storage.add(req.body.name);
    res.status(201).json(item);
});

// Remove the selected item from the list
app.delete('/items/:id', function (req, res) {
    var idnum = req.params.id;

    if (!storage.items.id === idnum) {
        return res.status(400).json('Cannot delete requested item');
    }

    var item = storage.del(idnum);
    res.status(200).json(item);

});

// Update the selected item in the list
app.put('/items/:id', jsonParser, function (req, res) {
    var id = req.params.id;

    if (!req.body) {
        // Vincent, why doesn't this work?
        return res.status(400).json('Big mistake buddy!');
    } else if (!storage.items[id]) {
        return res.status(400).json('Cannot update requested item');
    }

    var item = storage.put(req.body.name, req.body.id);
    res.status(200).json(item);

})

app.listen(process.env.PORT || 8080);
