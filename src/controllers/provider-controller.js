// controllers/provider.controller.js
import { pool } from "../config/db.js";

export const getAllProviders = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM providers");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error fetching providers" });
  }
};
