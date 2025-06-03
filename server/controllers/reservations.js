import Reservation from '../models/reservation.js';

// Get all reservations
export const getAllReservations = async (req, res) => {
    try {
        const reservation = await Reservation.findAll();
        res.status(200).json(reservation);
    }catch (error) {
        console.error("Error fetching Reservations:", error);
        res.status(500).json({ error: error.message });
    }
}

// Create a new reservation
export const createReservation = async (req, res) => {
    try{
        const {
            body: { customerName, customerEmail, customerPhone, reservationDate, guests },
        } = req;
        if (!customerName || !customerEmail || !reservationDate || !guests) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingReservation = await Reservation.findOne({ where: { customerEmail, reservationDate } });
        if (existingReservation) {
            return res.status(400).json({ message: "Reservation already exists for this email and date" });
        }
        const reservation = await Reservation.create(req.body);
        res.status(201).json(reservation);
    }catch (error) {
        console.error("Error creating Reservation:", error);
        res.status(500).json({ error: error.message});
    }
}

// Get a reservation by ID
export const getReservationById = async (req, res) => {
    try{
        const {
            params: { id },
        } = req;
        const reservation = await Reservation.findByPk(id);
        if(!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }
        res.status(201).json(reservation);

    }catch (error) {
        console.error("Error fetching Reservation by ID:", error);
        res.status(500).json({ error: error.message });
    }
}

// Update a reservation
export const updateReservation = async (req, res) => {
    try{
        const {
            body: { customerName, customerEmail, customerPhone, reservationDate, guests },
            params: { id },
        } = req;
        const reservation = await Reservation.findByPk(id);
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }
        if (!customerName || !customerEmail || !reservationDate || !guests) {
            return res.status(400).json({ message: "All fields are required" });
        }
        await reservation.update(req.body);
        res.status(200).json(reservation);
    }catch (error) {
        console.error("Error updating Reservation:", error);
        res.status(500).json({ error: error.message });
    }
}

// Delete a reservation
export const deleteReservation = async (req, res) => {
    try{
        const {
            params: { id },
        } = req;
        const reservation = await Reservation.findByPk(id);
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }
        await reservation.destroy();
        res.status(204).json({ message: "Reservation deleted successfully" });
    }catch (error) {
        console.error("Error deleting Reservation:", error);
        res.status(500).json({ error: error.message });
    }
}