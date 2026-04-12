import "./styles/App.css";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SearchSection from "./components/ExploreBar";
import Footer from "./components/Footer";
import CartModal from "./components/CartModal";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider, useCart } from "./contexts/CartContext";
import Catalog from "./pages/Catalog";
import Delivery from "./pages/Delivery";
import { useState } from "react";
import Testimonial from "./components/Testimonial";
import About from "./pages/AboutUs";
import { FavoritesProvider } from "./contexts/FavoritesContext";

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
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
              <SearchSection />
              <Testimonial />
            </>
          }
        />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/about" element={<About />} />
        <Route path="/delivery" element={<Delivery />} />
      </Routes>
      <Footer />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

function App() {
  return (
    <FavoritesProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <AppContent />
        </Router>
      </CartProvider>
    </FavoritesProvider>
  );
}

export default App;