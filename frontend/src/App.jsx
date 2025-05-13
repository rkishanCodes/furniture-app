import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import Header from "./components/Header";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import UserDashboard from "./Pages/User/UserDashboard";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import BuyFurniture from "./Pages/Shop/BuyFurniture";
import { FurnitureProvider } from "./context/FurnitureContext";
import Home from "./components/Home/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import "./App.css";
import AddProduct from "./Pages/Admin/AddProduct";

function App() {
  return (
    <Provider store={store}>
      <FurnitureProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/shop"
              element={
                <ProtectedRoute>
                  <BuyFurniture />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-dashboard"
              element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/add-product"
              element={
                <AdminRoute>
                  <AddProduct />
                </AdminRoute>
              }
            />
          </Routes>
        </Router>
      </FurnitureProvider>
    </Provider>
  );
}

export default App;
