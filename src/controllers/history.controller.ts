import { Request, Response } from "express";
import { Booking_History } from "../database/models/Booking_history";
import { MoreThanOrEqual, LessThanOrEqual } from "typeorm";

export const getHistories = async (req: Request, res: Response) => {
    try {
        const { start_date, end_date } = req.body;

        const startDate = new Date(start_date as string);
        const endDate = new Date(end_date as string);

        const period = await Booking_History.find({
            select: ['room_id', 'user_id', 'entry_datetime', 'exit_datetime'],
            where: {
                entry_datetime: MoreThanOrEqual(startDate),
                exit_datetime: LessThanOrEqual(endDate)
            }
        });

        if (period.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No data available for this time period."
            });
        }

        res.json({
            success: true,
            message: "History for this time period retrieved successfully!",
            data: period
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error obtaining access histories for the selected date range!",
            error: (error as Error).message
        });
    }
}

//GET HISTORY BY ROOM ID
export const getRoomHistory = async (req: Request, res: Response) => {
    try {
        const roomId = parseInt(req.params.id);
        if (isNaN(roomId)) {
            return res.status(400).json({ success: false, message: "Invalid room ID format" });
        }

        const room = await Booking_History.find({
            where: { room_id: roomId }
        });

        if (room.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No history found for the selected room."
            });
        }

        res.json({
            success: true,
            message: "History for the selected room obtained successfully!",
            data: room
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error obtaining access histories for the selected room!",
            error: (error as Error).message
        });
    }
}