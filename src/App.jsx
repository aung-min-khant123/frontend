import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/clients/Home";
import Products from "./pages/clients/Products";
import Footer from "./components/Footer";
import AdminProducts from "./pages/admin/AdminProducts";
import ProductDetails from "./pages/clients/ProductDetails";
import LoadingPage from "./components/LoadingPage";

function App() {
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="min-h-screen flex flex-col justify-between">
          <div>
            <NavBar />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/admin" element={<AdminProducts />} />
            </Routes>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;