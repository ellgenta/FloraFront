import "./styles/App.css";

import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SearchSection from "./components/ExploreBar";
import Footer from "./components/Footer";
import Testimonial from "./components/Testimonial";

import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

import { CartProvider, useCart } from "./contexts/CartContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { RecentlyViewedProvider } from "./contexts/RecentlyViewedContext";

import Catalog from "./pages/Catalog";
import Delivery from "./pages/Delivery";
import About from "./pages/AboutUs";
import FavoritesPage from "./pages/FavoritesPage";
import CartPage from "./pages/CartPage";

import ProductPage from "./components/ProductPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

// Admin
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminProductCreate from "./pages/admin/AdminProductCreate";
import AdminProductEdit from "./pages/admin/AdminProductEdit";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminReviews from "./pages/admin/AdminReviews";

function SiteLayout() {
  const { getTotalItems } = useCart();

  return (
    <div className="app">
      <Header cartItemCount={getTotalItems()} />

      <Outlet />

      <Footer />
    </div>
  );
}

function AppContent() {
  return (
    <Routes>
      {/* Обычный сайт */}
      <Route element={<SiteLayout />}>
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
      </Route>

      {/* Админская панель */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="products/create" element={<AdminProductCreate />} />
        <Route path="products/edit/:id" element={<AdminProductEdit />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="reviews" element={<AdminReviews />} />
      </Route>
    </Routes>
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