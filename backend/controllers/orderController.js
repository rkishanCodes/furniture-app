import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";

const prisma = new PrismaClient();

// @desc    Create a new order
// @route   POST /api/orders
export const createOrder = asyncHandler(async (req, res) => {
  const { items } = req.body;

  // Validate items
  if (!items || items.length === 0) {
    res.status(400).json({ message: "No order items" });
    return;
  }

  // Calculate total price and prepare order items
  const orderItems = await Promise.all(
    items.map(async (item) => {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        throw new Error(`Product ${item.productId} not found`);
      }

      return {
        productId: item.productId,
        quantity: item.quantity,
        price: product.price * item.quantity,
      };
    })
  );

  // Create order
  const order = await prisma.order.create({
    data: {
      userId: req.user.id,
      items: {
        create: orderItems,
      },
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  res.status(201).json(order);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
export const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    res.status(404).json({ message: "Order not found" });
    return;
  }

  // Ensure user can only access their own orders or admin can access all
  if (order.userId !== req.user.id && req.user.role !== "ADMIN") {
    res.status(403).json({ message: "Not authorized to view this order" });
    return;
  }

  res.json(order);
});

// @desc    Get logged in user's orders
// @route   GET /api/orders
export const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await prisma.order.findMany({
    where: { userId: req.user.id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  res.json(orders);
});

// @desc    Get all orders (Admin only)
// @route   GET /api/orders/all
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await prisma.order.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  res.json(orders);
});

// @desc    Update order status (Admin only)
// @route   PUT /api/orders/:id
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = await prisma.order.update({
    where: { id },
    data: { status },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  res.json(order);
});
