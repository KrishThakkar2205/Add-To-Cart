
const createConnection = require('./dbconnection.js')
const Cart = require('./models/Cart.js')
const express = require('express')
const app = express()
const cors = require('cors')

createConnection()

//Middleware 
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.get('/getCart',async(req,res)=>{
    try {
        const cartItems = await Cart.find({})
        res.json(cartItems);

    } catch (e) {
        console.log(e)
        res.status(500).json({error:"Not not Recived"})
    }
})

app.post('/addToCart',async(req,res)=>{
    console.log(req.body)
    const name = req.body.name;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const newItem = new Cart({productName:name,price:price,noOFItems:quantity})
    await newItem.save()
    res.status(200)
})

app.post('/updateItem',async (req,res) => {
    const id = req.body._id;
    const newItems = req.body.newQuantity;
    try {
        await Cart.updateOne({_id:id,noOFItems:newItems});
        res.status(200)
    } catch (error) {
        res.status(500)
    }
})

app.post('/deleteCart', async(req,res) => {
    const id = req.body.id;
    try {
        await Cart.deleteOne({_id:id});
        res.status(200)
    } catch (error) {
        console.log(error);
        res.status(500);
    }
})

app.listen(5000)