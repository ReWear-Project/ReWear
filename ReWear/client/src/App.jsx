import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";

import Landing from "./pages/Landing";
import Explore from "./pages/Explore";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";
import HowItWorks from "./pages/HowitWorks";
import ScrollProgress from "./components/ui/ScrollProgress";
import CustomCursor from "./components/ui/CustomCursor";
import Sell from "./pages/Sell";
import Cart from "./pages/Cart";
import Wishlist from "./pages/WishList";
import Dashboard from "./pages/Dashboard";
import ScrollToTop from "./components/ui/ScrolltoTop";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>

      {/* GLOBAL UI */}
      <ScrollToTop/>
      <ScrollProgress />
      <CustomCursor />

      <MainLayout>
        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Landing />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/howitworks" element={<HowItWorks />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* 🔒 PROTECTED ROUTES */}
          <Route
            path="/sell"
            element={
              <ProtectedRoute>
                <Sell />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/success"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />

        </Routes>
      </MainLayout>

    </Router>
  );
}

export default App;