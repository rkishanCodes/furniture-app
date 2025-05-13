import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import UserDashboard from "./pages/User/UserDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import BuyFurniture from "./pages/Shop/BuyFurniture";
import { FurnitureProvider } from "./context/FurnitureContext";
import "./App.css";
import Home from "./components/Home/Home";

function App() {
  return (
    <FurnitureProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/shop" element={<BuyFurniture />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </FurnitureProvider>
  );
}

export default App;
