import { Plus, Minus, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import type { CartItem } from "../contexts/CartContext";
import "../styles/CartPage.css";

function CartPage() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    alert("Checkout functionality would be implemented here!");
  };

  return (
    <main className="cart-page">
      <div className="cart-page__container">
        <div className="cart-page__header">
          <h2 className="cart-page__title">
            <ShoppingBag size={22} strokeWidth={1.8} />
            Your Cart ({cartItems.length} items)
          </h2>
        </div>

        <div className="cart-page__content">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <ShoppingBag size={48} strokeWidth={1.4} />
              <p>Your cart is empty</p>
              <button
                className="cart-continue-shopping"
                onClick={() => navigate("/catalog")}
              >
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
                          <Minus size={14} />
                        </button>

                        <span className="quantity">{item.quantity}</span>

                        <button
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={14} />
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
    </main>
  );
}

export default CartPage;