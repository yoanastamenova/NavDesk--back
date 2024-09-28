import { Request, Response } from "express";
import { Access } from "../database/models/Access";
import moment from "moment";

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
        const accesses = await Access.find({
            where: {
                room_id: roomId
            },
            select: ['user_id', 'room_id', 'entry_datetime', 'exit_datetime', 'state']
        });

        if (accesses.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No current access requests found for this room."
            });
        }

        res.json({
            success: true,
            message: "Current access requests for the room are retrieved successfully!",
            data: accesses
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

// REGISTER AS CHECK-IN
export const checkIn = async (req: Request, res: Response) => {
    try {
        const reservationId = parseInt(req.params.id);
        if (isNaN(reservationId)) {
            return res.status(400).json({ success: false, message: "Invalid reservation ID format" });
        }

        const reservation = await Access.findOneBy({ id: reservationId });
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
            return res.status(400).json({ success: false, message: "Invalid reservation ID format" });
        }

        const reservation = await Access.findOneBy({ id: reservationId });
        if (!reservation) {
            return res.status(404).json({ success: false, message: "No reservation found with the provided ID" });
        }

        if (new Date() < new Date(reservation.entry_datetime) || reservation.state !== 'checked-in') {
            return res.status(400).json({
                success: false,
                message: "You must check-in first before checking out"
            });
        }

        reservation.state = "checked-out";
        reservation.exit_datetime = new Date();
        await reservation.save();

        res.status(200).json({
            success: true,
            message: "Checked out successfully",
            data: reservation
        });
    } catch (error) {
        console.error("Error during check-out:", error);
        res.status(500).json({
            success: false,
            message: "Error during check-out",
            error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
        });
    }
};

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
        const reservation = await Access.create({
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
            error: (error as Error).message  // Consider filtering error details in production
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

        const reservation = await Access.findOneBy({ id: reservationId });
        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: "No reservation with this ID exists!"
            });
        }

        await Access.delete({ id: reservationId });

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