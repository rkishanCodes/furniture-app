// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.get("/api/furniture", async (req, res) => {
  const result = await pool.query("SELECT * FROM furniture");
  res.json(result.rows);
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
