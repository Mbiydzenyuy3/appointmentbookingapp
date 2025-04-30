// controllers/slot.controller.js
import { pool } from "../config/db.js";

export const createTimeSlot = async (req, res) => {
  const { provider_id } = req.user;
  const { start_time, end_time } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO time_slots (provider_id, start_time, end_time) 
       VALUES ($1, $2, $3) RETURNING *`,
      [provider_id, start_time, end_time]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Could not create time slot" });
  }
};

export const getProviderSlots = async (req, res) => {
  const { provider_id } = req.user;

  try {
    const result = await pool.query(
      "SELECT * FROM time_slots WHERE provider_id = $1 ORDER BY start_time",
      [provider_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Could not retrieve slots" });
  }
};

export const getAvailableSlots = async (req, res) => {
  const { providerId } = req.params;
  const { from, to } = req.query;

  try {
    let query = `SELECT * FROM time_slots WHERE provider_id = $1 AND is_booked = false`;
    const values = [providerId];

    if (from && to) {
      query += ` AND start_time BETWEEN $2 AND $3`;
      values.push(from, to);
    }

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch available slots" });
  }
};
