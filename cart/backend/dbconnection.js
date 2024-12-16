// mongodb+srv://kdthakkar22:mrEihtdmisx07QNP@cluster0.b4ghb.mongodb.net/cart?retryWrites=true&w=majority&appName=Cluster0
const mongoose = require('mongoose')
const express = require('express')

const app = express()

const createConnection = function(){

    mongoose.connect('mongodb+srv://kdthakkar22:mrEihtdmisx07QNP@cluster0.b4ghb.mongodb.net/cart?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log('connected')).catch(()=>console.log('Not Connected'))

}
module.exports = createConnection;