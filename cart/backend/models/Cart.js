const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const cart = Schema({
    productName: String,
    price: Number,
    noOFItems: Number
})

const Cart = mongoose.model('Cart', cart)

module.exports = Cart