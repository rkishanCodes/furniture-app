// src/controllers/productController.js
import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";

const prisma = new PrismaClient();

// @desc    Get all products
// @route   GET /api/products
export const getProducts = asyncHandler(async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

// @desc    Create a new product (Admin only)
// @route   POST /api/products
export const createProduct = asyncHandler(async (req, res) => {
  const { name, category, width, height, depth, price, imageUrl, dimensions } =
    req.body;

  const product = await prisma.product.create({
    data: {
      name,
      category,
      width,
      height,
      depth,
      price,
      imageUrl,
      dimensions,
    },
  });

  res.status(201).json(product);
});

// @desc    Update product details (Admin only)
// @route   PUT /api/products/:id
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, category, width, height, depth, price, imageUrl, dimensions } =
    req.body;

  const updatedProduct = await prisma.product.update({
    where: { id },
    data: {
      name,
      category,
      width,
      height,
      depth,
      price,
      imageUrl,
      dimensions,
    },
  });

  res.json(updatedProduct);
});
