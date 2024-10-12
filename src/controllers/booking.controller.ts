import { Request, Response } from "express";
import { Booking } from "../database/models/Booking";
import moment from "moment";
import { Booking_History } from "../database/models/Booking_history";

// GET CURRENT
export const getCurrentAccess = async (req: Request, res: Response) => {
    const roomId = parseInt(req.params.id);

    if (isNaN(roomId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid room ID format."
        });
    }

    try {
        const bookings = await Booking.find({
            where: {
                room_id: roomId
            },
            select: ['user_id', 'room_id', 'entry_datetime', 'exit_datetime', 'state']
        });

        if (bookings.length === 0) { 
            return res.status(404).json({
                success: false,
                message: "No current access requests found for this room."
            });
        }

        res.json({
            success: true,
            message: "Current access requests for the room are retrieved successfully!",
            data: bookings
        });
    } catch (error) {
        console.error("Error getting current access for room:", error);
        res.status(500).json({
            success: false,
            message: "Error getting current access for the room",
            error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
        });
    }
}

// GET USER BOOKINGS
export const getUserBookings = async (req: Request, res: Response) => {
    const userId = req.tokenData.id;  

    try {
        const bookings = await Booking.find({
            where: {
                user_id: userId
            },
            select: ['id', 'room_id', 'entry_datetime', 'exit_datetime', 'state']
        });

        if (bookings.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No bookings found for this user."
            });
        }

        res.json({
            success: true,
            message: "Bookings retrieved successfully!",
            data: bookings
        });
    } catch (error) {
        console.error("Error getting user bookings:", error);
        res.status(500).json({
            success: false,
            message: "Error retrieving user bookings",
            error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
        });
    }
}

// REGISTER CHECK-IN
export const checkIn = async (req: Request, res: Response) => {
    try {
        const reservationId = parseInt(req.params.id);
        if (isNaN(reservationId)) {
            return res.status(400).json({ success: false, message: "Invalid reservation ID format" });
        }

        const reservation = await Booking.findOneBy({ id: reservationId });
        if (!reservation) {
            return res.status(404).json({ success: false, message: "No reservation found with the provided ID" });
        }

        const currentTime = moment();
        const entryTime = moment(reservation.entry_datetime);

        // Allowing a 5 minute grace period before the actual entry time
        if (currentTime.isBefore(entryTime.subtract(5, 'minutes'))) {
            return res.status(400).json({
                success: false,
                message: "Check-in time has not started yet."
            });
        }

        reservation.state = "checked-in";
        reservation.entry_datetime = new Date();  

        await reservation.save();
        res.status(200).json({
            success: true,
            message: "Checked in successfully",
            data: reservation
        });
    } catch (error) {
        console.error("Error during check-in:", error);
        res.status(500).json({
            success: false,
            message: "Error during check-in",
            error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
        });
    }
};
//REGISTER CHECK-OUT
export const checkOut = async (req: Request, res: Response) => {
    try {
        const reservationId = parseInt(req.params.id);
        if (isNaN(reservationId)) {
            return res.status(400).json({ success: false, message: "Invalid reservation ID format." });
        }

        const reservation = await Booking.findOneBy({ id: reservationId });
        if (!reservation) {
            return res.status(404).json({ success: false, message: "No reservation found with this ID." });
        }

        // Ensuring that the user is checking out after the entry datetime
        if (new Date() < new Date(reservation.entry_datetime)) {
            return res.status(400).json({
                success: false,
                message: "Check-out is not allowed before the check-in date."
            });
        }

        // Move to Access_History
        const history = new Booking_History();
        history.room_id = reservation.room_id;
        history.user_id = reservation.user_id;
        history.entry_datetime = reservation.entry_datetime;
        history.exit_datetime = new Date();
        history.access_state = "completed";
        await history.save();

        // Optionally delete the access record or mark it as checked-out
        await Booking.delete({ id: reservationId });

        res.json({
            success: true,
            message: "Checked out and history updated successfully.",
            data: history
        });
    } catch (error) {
        console.error("Error during check-out:", error);
        res.status(500).json({
            success: false,
            message: "Error during check-out",
            error: (error as Error).message
        });
    }
}

// CREATE RESERVATION
export const newReservation = async (req: Request, res: Response) => {
    try {
        const { room_id, entry_datetime, exit_datetime } = req.body;
        const user_id = req.tokenData.id;

        // Validate presence of all required fields
        if (!room_id || !entry_datetime || !exit_datetime) {
            return res.status(400).json({
                success: false,
                message: "Room number, entry time, and exit time are required!"
            });
        }

        // Create date objects
        const entryDate = new Date(entry_datetime);
        const exitDate = new Date(exit_datetime);

        // Time validation: exit time must be after entry time
        if (exitDate <= entryDate) {
            return res.status(400).json({
                success: false,
                message: "Exit time must be later than entry time."
            });
        }

        // Create new reservation
        const reservation = await Booking.create({
            room_id,
            user_id,
            entry_datetime: entryDate,
            exit_datetime: exitDate,
            state: "reserved"  // Assuming "reserved" is initial state
        }).save();

        res.status(201).json({
            success: true,
            message: "New reservation created successfully!",
            data: reservation
        });
    } catch (error) {
        console.error("Error creating a new reservation:", error);
        res.status(500).json({
            success: false,
            message: "Error creating a new reservation!",
            error: (error as Error).message  
        });
    }
}

//CANCEL RESERVATION
export const cancelReserve = async (req: Request, res: Response) => {
    try {
        const reservationId = parseInt(req.params.id);
        if (isNaN(reservationId)) {
            return res.status(400).json({ success: false, message: "Invalid reservation ID format" });
        }

        const reservation = await Booking.findOneBy({ id: reservationId });
        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: "No reservation with this ID exists!"
            });
        }

        await Booking.delete({ id: reservationId });

        res.status(200).json({
            success: true,
            message: "Reservation cancelled successfully!"
        });
    } catch (error) {
        console.error("Error cancelling reservation:", error);
        res.status(500).json({
            success: false,
            message: "Reservation can't be cancelled",
            error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
        });
    }
}

//MODIFY BOOKING

export const updateReservation = async (req: Request, res: Response) => {
    try {
        const reservationId = parseInt(req.params.id);
        if (isNaN(reservationId)) {
            return res.status(400).json({ success: false, message: "Invalid reservation ID format" });
        }

        const { entry_datetime, exit_datetime } = req.body;
        if (!entry_datetime || !exit_datetime) {
            return res.status(400).json({ 
                success: false, 
                message: "Missing start or end datetime"
            });
        }

        const reservation = await Booking.findOneBy({ id: reservationId });
        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: "No reservation found with this ID"
            });
        }

        if (["checked-in", "checked-out", "cancelled"].includes(reservation.state)) {
            return res.status(400).json({
                success: false,
                message: "Cannot update a reservation that is already " + reservation.state
            });
        }

        // Update reservation dates
        reservation.entry_datetime = new Date(entry_datetime);
        reservation.exit_datetime = new Date(exit_datetime);

        await reservation.save();

        res.status(200).json({
            success: true,
            message: "Reservation updated successfully",
            data: {
                id: reservation.id,
                entry_datetime: reservation.entry_datetime,
                exit_datetime: reservation.exit_datetime
            }
        });
    } catch (error) {
        console.error("Error updating reservation:", error);
        res.status(500).json({
            success: false,
            message: "Error updating reservation",
            error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
        });
    }
}