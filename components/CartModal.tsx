import React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../src/contexts/CartContext';
import type { CartItem } from '../src/contexts/CartContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  if (!isOpen) return null;

  const handleCheckout = () => {
    alert('Checkout functionality would be implemented here!');
    // Here you would typically navigate to checkout page or integrate with payment system
  };

  return (
    <div className="cart-modal-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={e => e.stopPropagation()}>
        <div className="cart-modal-header">
          <h2 className="cart-modal-title">
            <ShoppingBag size={24} />
            Your Cart ({cartItems.length} items)
          </h2>
          <button className="cart-modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="cart-modal-content">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <ShoppingBag size={48} />
              <p>Your cart is empty</p>
              <button className="cart-continue-shopping" onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((item: CartItem) => (
                  <div key={item.id} className="cart-item">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-image"
                    />
                    <div className="cart-item-details">
                      <h3 className="cart-item-name">{item.name}</h3>
                      <p className="cart-item-description">{item.description}</p>
                      <div className="cart-item-price">${item.price.toFixed(2)}</div>
                    </div>
                    <div className="cart-item-controls">
                      <div className="quantity-controls">
                        <button
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="cart-total">
                  <span>Total:</span>
                  <span className="total-price">${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="cart-actions">
                  <button className="clear-cart-btn" onClick={clearCart}>
                    Clear Cart
                  </button>
                  <button className="checkout-btn" onClick={handleCheckout}>
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;