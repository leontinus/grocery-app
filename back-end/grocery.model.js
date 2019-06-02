const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let item = new Schema({
    UPC12Barcode: Number,
    Brand: String,
    ProductName: String
});

module.exports = mongoose.model('item', item)