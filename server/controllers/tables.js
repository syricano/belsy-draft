// Tables controller for managing restaurant tables only by Admin users
import table from "../models/table";

// Get all tables
export const getAllTables = async (req, res) => {
    try {
        const tables = await table.findAll();
        res.status(200).json(tables);
    } catch (error) {
        console.error("Error fetching Tables:", error);
        res.status(500).json({ error: error.message });
    }
}

// Create a new table
export const createTable = async (req, res) => {
    try {
        const { body: { number, seats, location } } = req;
        if (!number || !seats || location) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingTable = await table.findOne({ where: { number } });
        if (existingTable) {
            return res.status(400).json({ message: "Table already exists with this number" });
        }
        const newTable = await table.create(req.body);
        res.status(201).json(newTable);
    } catch (error) {
        console.error("Error creating Table:", error);
        res.status(500).json({ error: error.message });
    }
}

// Get a table by ID
export const getTableById = async (req, res) => {
    try {
        const { 
            params: { id },
         } = req;
        const tableData = await table.findByPk(id);
        if (!tableData) return res.status(404).json({ message: "Table not found" });
        res.status(201).json(tableData);
    } catch (error) {
        console.error("Error fetching Table by ID:", error);
        res.status(500).json({ error: error.message });
    }
}

// Update a table
export const updateTable = async (req, res) => {
    try {
        const { 
            body: { number, seats, location }, 
            params: { id } 
        } = req;
        const tableData = await table.findByPk(id);
        if (!tableData) {
            return res.status(404).json({ message: "Table not found" });
        }
        if (!number || !seats || !location) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const updatedTable = await tableData.update(req.body);
        res.status(200).json(updatedTable);
    } catch (error) {
        console.error("Error updating Table:", error);
        res.status(500).json({ error: error.message });
    }
}

// Delete a table
export const deleteTable = async (req, res) => {
    try {
        const { 
            params: { id } 
        } = req;
        const tableData = await table.findByPk(id);
        if (!tableData) {
            return res.status(404).json({ message: "Table not found" });
        }
        await tableData.destroy();
        res.status(200).json({ message: "Table deleted successfully" });
    } catch (error) {
        console.error("Error deleting Table:", error);
        res.status(500).json({ error: error.message });
    }
}
