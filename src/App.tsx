import "./App.css";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchSection from "../components/SearchBar";
import Footer from "../components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Catalog from "./pages/Catalog";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <SearchSection />
            </>
          } />
          <Route path="/catalog" element={<Catalog />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
