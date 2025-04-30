// controllers/appointment.controller.js
import { pool } from "../config/db.js";

export const bookAppointment = async (req, res) => {
  const { slot_id } = req.body;
  const client_id = req.user.id;

  try {
    const slot = await pool.query("SELECT * FROM time_slots WHERE id = $1", [
      slot_id,
    ]);

    if (slot.rows.length === 0 || slot.rows[0].is_booked) {
      return res.status(400).json({ error: "Time slot unavailable" });
    }

    const provider_id = slot.rows[0].provider_id;

    await pool.query(
      "INSERT INTO appointments (slot_id, client_id, provider_id) VALUES ($1, $2, $3)",
      [slot_id, client_id, provider_id]
    );

    await pool.query("UPDATE time_slots SET is_booked = true WHERE id = $1", [
      slot_id,
    ]);

    req.io.emit(`appointment:booked:${provider_id}`, {
      slot_id,
      client_id,
      provider_id,
    });

    res.status(201).json({ message: "Appointment booked successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getMyAppointments = async (req, res) => {
  const client_id = req.user.id;

  try {
    const result = await pool.query(
      `SELECT a.*, s.start_time, s.end_time, p.name AS provider_name
       FROM appointments a
       JOIN time_slots s ON a.slot_id = s.id
       JOIN providers p ON a.provider_id = p.id
       WHERE a.client_id = $1
       ORDER BY s.start_time`,
      [client_id]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Could not retrieve appointments" });
  }
};

export const getProviderAppointments = async (req, res) => {
  const { provider_id } = req.user;

  try {
    const result = await pool.query(
      `SELECT a.*, s.start_time, s.end_time, u.name AS client_name
       FROM appointments a
       JOIN time_slots s ON a.slot_id = s.id
       JOIN users u ON a.client_id = u.id
       WHERE a.provider_id = $1
       ORDER BY s.start_time`,
      [provider_id]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch appointments" });
  }
};

export const cancelAppointment = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  try {
    const result = await pool.query(
      "SELECT * FROM appointments WHERE id = $1",
      [id]
    );
    const appointment = result.rows[0];

    if (!appointment) return res.status(404).json({ error: "Not found" });

    if (
      appointment.client_id !== user_id &&
      appointment.provider_id !== user_id
    )
      return res.status(403).json({ error: "Unauthorized" });

    await pool.query("UPDATE appointments SET status = $1 WHERE id = $2", [
      "canceled",
      id,
    ]);
    await pool.query("UPDATE time_slots SET is_booked = false WHERE id = $1", [
      appointment.slot_id,
    ]);

    req.io.emit(`appointment:cancelled:${appointment.provider_id}`, {
      appointment_id: id,
    });

    res.json({ message: "Appointment cancelled" });
  } catch (err) {
    res.status(500).json({ error: "Failed to cancel" });
  }
};
