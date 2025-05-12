import express from "express";
import {
  createOrder,
  getOrderById,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// User routes
router
  .route("/")
  .post(protect, createOrder) // Create a new order
  .get(protect, getUserOrders); // Get user's own orders

// Admin routes
router.route("/all").get(protect, admin, getAllOrders); // Get all orders (admin only)

router
  .route("/:id")
  .get(protect, getOrderById) // Get a specific order by ID
  .put(protect, admin, updateOrderStatus); // Update order status (admin only)

export default router;
