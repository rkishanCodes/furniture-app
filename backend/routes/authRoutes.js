import express from "express";
import { registerUser, loginUser, registerAdmin, loginAdmin } from "../controllers/authController.js";

const router = express.Router();

console.log("auth routes");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/registerAdmin", registerAdmin);
router.post("/loginAdmin", loginAdmin);

router.get("/", (req, res) => {
  res.send("auth is working");
});

export default router;
