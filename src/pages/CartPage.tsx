import { useState } from "react";
import { Plus, Minus, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../contexts/CartContext";
import type { CartItem } from "../contexts/CartContext";
import { orderApi } from "../api/orderApi";
import type { AddressRequest } from "../types/order";

import "../styles/CartPage.css";

function CartPage() {
  const navigate = useNavigate();

  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    clearCart,
  } = useCart();

  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const [deliveryAddress, setDeliveryAddress] = useState<AddressRequest>({
    state: "",
    city: "",
    street: "",
    house: "",
    apartment: "",
  });

  const handleAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setDeliveryAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getCurrentUserId = () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      return null;
    }

    return Number(userId);
  };

  const isAddressValid = () => {
    return (
      deliveryAddress.state.trim() &&
      deliveryAddress.city.trim() &&
      deliveryAddress.street.trim() &&
      deliveryAddress.house.trim()
    );
  };

  const handleCheckout = async () => {
    const userId = getCurrentUserId();

    if (!userId) {
      alert("Please log in before placing an order.");
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      return;
    }

    if (!isAddressValid()) {
      alert("Please fill in the delivery address.");
      return;
    }

    try {
      setIsCheckoutLoading(true);

      await orderApi.create({
        userId,
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        deliveryAddress: {
          state: deliveryAddress.state,
          city: deliveryAddress.city,
          street: deliveryAddress.street,
          house: deliveryAddress.house,
          apartment: deliveryAddress.apartment || undefined,
        },
      });

      clearCart();
      alert("Order created successfully!");
      navigate("/catalog");
    } catch (error) {
      console.error("Create order error:", error);
      alert("Error while creating order");
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  return (
    <main className="cart-page">
      <div className="cart-page__container">
        <div className="cart-page__header">
          <h2 className="cart-page__title">
            <ShoppingBag size={22} strokeWidth={1.8} />
            Your Cart ({getTotalItems()} items)
          </h2>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-page__content">
            <div className="cart-empty">
              <ShoppingBag size={48} strokeWidth={1.4} />

              <p>Your cart is empty</p>

              <button
                type="button"
                className="cart-continue-shopping"
                onClick={() => navigate("/catalog")}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="cart-layout">
            <section className="cart-layout__items">
              <div className="cart-items">
                {cartItems.map((item: CartItem) => (
                  <div key={item.id} className="cart-item">
                    <img
                      src={item.image || "/flower.png"}
                      alt={item.name}
                      className="cart-item-image"
                    />

                    <div className="cart-item-details">
                      <h3 className="cart-item-name">{item.name}</h3>

                      <p className="cart-item-description">
                        {item.description}
                      </p>

                      <div className="cart-item-price">
                        ${item.price.toFixed(2)}
                      </div>
                    </div>

                    <div className="cart-item-controls">
                      <div className="quantity-controls">
                        <button
                          type="button"
                          className="quantity-btn"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Minus size={14} />
                        </button>

                        <span className="quantity">{item.quantity}</span>

                        <button
                          type="button"
                          className="quantity-btn"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <aside className="cart-layout__summary">
              <div className="cart-summary-card">
                <h3 className="cart-summary-card__title">Delivery Address</h3>

                <div className="cart-address-form">
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={deliveryAddress.state}
                    onChange={handleAddressChange}
                    className="cart-address-input"
                  />

                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={deliveryAddress.city}
                    onChange={handleAddressChange}
                    className="cart-address-input"
                  />

                  <input
                    type="text"
                    name="street"
                    placeholder="Street"
                    value={deliveryAddress.street}
                    onChange={handleAddressChange}
                    className="cart-address-input"
                  />

                  <input
                    type="text"
                    name="house"
                    placeholder="House"
                    value={deliveryAddress.house}
                    onChange={handleAddressChange}
                    className="cart-address-input"
                  />

                  <input
                    type="text"
                    name="apartment"
                    placeholder="Apartment"
                    value={deliveryAddress.apartment || ""}
                    onChange={handleAddressChange}
                    className="cart-address-input"
                  />
                </div>
              </div>

              <div className="cart-summary-card">
                <h3 className="cart-summary-card__title">Order Summary</h3>

                <div className="cart-summary-card__row">
                  <span>Items</span>
                  <span>{getTotalItems()}</span>
                </div>

                <div className="cart-summary-card__row cart-summary-card__row--total">
                  <span>Total</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>

                <div className="cart-summary-card__actions">
                  <button
                    type="button"
                    className="clear-cart-btn"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </button>

                  <button
                    type="button"
                    className="checkout-btn"
                    onClick={handleCheckout}
                    disabled={isCheckoutLoading}
                  >
                    {isCheckoutLoading
                      ? "Creating order..."
                      : "Proceed to Checkout"}
                  </button>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

export default CartPage;