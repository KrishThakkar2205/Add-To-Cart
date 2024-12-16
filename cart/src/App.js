import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';
import Cart from './Cart';
import ProductGrid from './ProductGrid';

const App = () => {
  
  const [cart, setCart] = useState([]);

  const products = [
    {id:1,name:"Product1", price:100},
    {id:2,name:'Product2',price:200},
    {id:3,name:'Product3',price:300},
    {id:4,name:'Product4',price:400},
    {id:5,name:'Product5',price:500},
    {id:6,name:'Product6',price:600},
    {id:7,name:'Product7',price:700},
  ]

  

  const handleAddToCart = async (product) => {
    try {
      await axios.post("http://localhost:5000/addToCart", product); 
      const updatedCart = await axios.get("http://localhost:5000/getCart");
      setCart(updatedCart.data); 
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handelUpdateCart = async (cartItem) => {
    try {
      await axios.post('http://localhost:5000/updateItem',cartItem)
      const updatedCart = await axios.get('http://localhost:5000/getCart');
      setCart(updatedCart);
    } catch (error) {
      console.log(error)
    }
  }

  const deleteCart = async(cartItem)=>{
    const id = cartItem._id
    try {
      await axios.post('http://localhost:5000/deleteCart',{id})
      const updatedCart = await axios.get('http://localhost:5000/getCart');
      setCart(updatedCart);
    } catch (error) {
      console.log(error)
    }
    
  }
  useEffect(()=>{
    const fetchData = async function(){
      try {
        const res = await axios.get('http://localhost:5000/getCart');
        const data = res.data;
        setCart(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  },[cart])

  return (
    <div className="app-container">
      <div className="cart-container">
        <Cart cart={cart} handleUpdate={handelUpdateCart} deleteItem={deleteCart} />
      </div>
      <div className="product-grid-container">
        <ProductGrid products={products} onAddToCart={handleAddToCart}/>
      </div>
    </div>
  );
};

export default App;
