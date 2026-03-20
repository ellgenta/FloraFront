import "./App.css";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchSection from "../components/SearchBar";
import Footer from "../components/Footer";
import CartModal from "../components/CartModal";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider, useCart } from "./contexts/CartContext";
import Catalog from "./pages/Catalog";
import Delivery from "./pages/Delivery";
import { useState } from "react";
import Testimonial from "../components/Testimonial";

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { getTotalItems } = useCart();

  return (
    <div className="app">
      <Header onCartClick={() => setIsCartOpen(true)} cartItemCount={getTotalItems()} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <SearchSection value={searchQuery} onChange={setSearchQuery} />
              <Testimonial />
            </>
          }
        />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/delivery" element={<Delivery />} />
      </Routes>
      <Footer />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;