// src/routes/productRoutes.js
import express from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);

router.route("/:id").put(protect, admin, updateProduct);

export default router;
