import "./styles/App.css";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SearchSection from "./components/ExploreBar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider, useCart } from "./contexts/CartContext";
import Catalog from "./pages/Catalog";
import Delivery from "./pages/Delivery";
import { useState } from "react";
import Testimonial from "./components/Testimonial";
import About from "./pages/AboutUs";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import ProductPage from "./components/ProductPage";
import { RecentlyViewedProvider } from "./contexts/RecentlyViewedContext";
import FavoritesPage from "./pages/FavoritesPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import CartPage from "./pages/CartPage";

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getTotalItems } = useCart();

  return (
    <div className="app">
      <Header
       cartItemCount={getTotalItems()}
      />

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
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>

      <Footer />
    
    </div>
  );
}

function App() {
  return (
    <FavoritesProvider>
      <RecentlyViewedProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <AppContent />
          </Router>
        </CartProvider>
      </RecentlyViewedProvider>
    </FavoritesProvider>
  );
}

export default App;