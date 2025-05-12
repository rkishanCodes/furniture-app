import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/jwt.js";
import { registerValidation, loginValidation } from "../utils/validation.js";
import asyncHandler from "express-async-handler";

const prisma = new PrismaClient();

// @desc    Register a new user
// @route   POST /api/auth/register

console.log("auth controller");

export const registerUser = asyncHandler(async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  const { name, email, password } = req.body;

  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user),
  });
});

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
export const loginUser = asyncHandler(async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user),
  });
});

// @desc    Register a new admin
// @route   POST /api/auth/register-admin
export const registerAdmin = asyncHandler(async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  const { name, email, password } = req.body;

  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) {
    res.status(400).json({ message: "Admin already exists" });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const admin = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "ADMIN", // Setting role as admin
    },
  });

  res.status(201).json({
    id: admin.id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    token: generateToken(admin),
  });
});

// @desc    Authenticate admin & get token
// @route   POST /api/auth/login-admin
export const loginAdmin = asyncHandler(async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  const { email, password } = req.body;

  const admin = await prisma.user.findUnique({ where: { email } });
  console.log(admin);
  if (!admin || admin.role !== "ADMIN") {
    res.status(401).json({ message: "Invalid admin email or password1" });
    return;
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    res.status(401).json({ message: "Invalid admin email or password" });
    return;
  }

  res.json({
    id: admin.id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    token: generateToken(admin),
  });
});
