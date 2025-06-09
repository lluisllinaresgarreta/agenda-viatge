import e from "express";
import { pool } from "../db.js";

// GET all clients or filter by destination
export const getClients = async (req, res) => {
  try {
    const { destination } = req.query;
    const [rows] = destination
      ? await pool.query("SELECT * FROM clients WHERE destination = ?", [destination])
      : await pool.query("SELECT * FROM clients");

    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtenir els clients" });
  }
};

// GET one client by ID
export const getClientById = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM clients WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: "Client no trobat" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al obtenir el client" });
  }
};

export const getClientsByDestination = async (req, res) => {
  const { destination } = req.query;
  if (!destination) {
    return res.status(400).json({ message: "El paràmetre 'destination' és obligatori" });
  }
  try {
    const [rows] = await pool.query("SELECT * FROM clients WHERE destination = ?", [destination]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtenir els clients per destinació" });
  }
}

// POST create client
export const createClient = async (req, res) => {
  const { name, surname, phone, email, destination } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO clients (name, surname, phone, email, destination) VALUES (?, ?, ?, ?, ?)",
      [name, surname, phone, email, destination]
    );
    res.status(201).json({ id: result.insertId, name, surname, phone, email, destination });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el client" });
  }
};

// PUT update client
export const updateClient = async (req, res) => {
  const { name, surname, phone, email, destination } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE clients SET name=?, surname=?, phone=?, email=?, destination=? WHERE id=?",
      [name, surname, phone, email, destination, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: "Client no trobat" });
    res.json({ message: "Client actualitzat correctament" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualitzar el client" });
  }
};

// DELETE client
export const deleteClient = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM clients WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Client no trobat" });
    res.json({ message: "Client eliminat correctament" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el client" });
  }
};
