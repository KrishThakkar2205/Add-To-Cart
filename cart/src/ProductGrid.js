import React, { useState } from "react";

const ProductGrid = ({ products, onAddToCart }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Manage quantity state

  const handleAddToCartClick = (product) => {
    setIsModalOpen(true);
    setSelectedProduct(product);
    setQuantity(1); // Reset quantity each time the modal opens
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const productWithQuantity = { ...selectedProduct, quantity }; 
    closeModal();
    console.log(productWithQuantity)
    onAddToCart(productWithQuantity);
  };

  return (
    <div>
      {/* Product Grid */}
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card">
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <button onClick={() => handleAddToCartClick(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content"  >
            <h2>Add {selectedProduct?.name} to Cart</h2>
            <form onSubmit={handleFormSubmit}>
              <div>
                <label>Quantity:</label>
                <input type="number" id="quantity" name="quantity" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} required/>
              </div>
              <button type="submit" className="btn btn-success">Add to Cart</button>
              <button type="button" onClick={closeModal} className="btn btn-secondary">
                Cancel
              </button>
            </form>
          </div>
          {/* <div className="modal-backdrop" onClick={closeModal}></div> */}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
