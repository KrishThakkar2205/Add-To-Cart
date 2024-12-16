import React, { useState } from 'react';
import axios from 'axios';
const Cart = ({ cart,handleUpdate,deleteItem }) => {

  const [modalStatus,setModalStatus] = useState(false);
  const [selectedProduct,setProduct] = useState(null);
  const [newQuantity,setNewQuantity] = useState(null);

  const handleFormSubmit = (e) =>{
    e.preventDefault();
    const updatedItems = {...selectedProduct,newQuantity};
    setModalStatus(false);
    handleUpdate(updatedItems)
  }

  const handleModalControl = function(cartItem){
    setProduct(cartItem);
    setModalStatus(true);
    setNewQuantity(cartItem.noOFItems)
  }

  return (
    <div>
    <div className="cart">
      <h2>Shopping Cart</h2>
      
        {cart.length === 0 ? (
          <h4>Your cart is empty</h4>
        ) : (
          cart.map((item, index) => (
            <div className='product-in-cart' id='{item._id}'>
                {item.productName} <br/> Item price = {item.price} <br/> 
                Number of item = {item.noOFItems}<br/>
                Total Price ={ item.price*item.noOFItems }
                <button onClick={()=>handleModalControl(item)}>Change Number of Items</button>
                <button onClick={()=>deleteItem(item)}>Delete</button>
            </div>
          ))
        )}
    </div>

    {modalStatus && (
      <div className='modal-overlay'>
        <div className='modal-content'>
          <h2>Change Quantity for {selectedProduct?.productName}</h2>
            <form onSubmit={handleFormSubmit}>
              <div>
                <label>Quantity:</label>
                <input type='number'value={newQuantity} onChange={(e)=>setNewQuantity(e.target.value)}/>
              </div>
              <button type='submit' className='btn btn-success'>Change the Quantity</button>
              <button type='button' className='btn btn-secondary' onClick={()=>setModalStatus(false)}>cancel</button>
            </form>
        </div>

      </div>
    )}
    </div>
  );
};

export default Cart;
