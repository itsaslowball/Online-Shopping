import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes,Route} from "react-router-dom";
import { Container } from 'react-bootstrap';

import Footer from "./components/Footer"
import Header from "./components/Header"
import HomeScreen from "./screens/HomeScreen";
import ProductDetails from "./screens/ProductDetails";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
function App() {
  return (
    <Router>
      <Header />
      <main className="my-3">
        <Container>
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart/:id?" element={<CartScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;