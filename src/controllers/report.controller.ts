import { Request, Response } from "express";
import { MoreThanOrEqual, LessThanOrEqual } from "typeorm";
import { Booking } from "../database/models/Booking";
import { Booking_History } from "../database/models/Booking_history";
import { Report } from "../database/models/Report";
import moment from "moment-timezone";
import { moveExpiredReservationsToHistory } from './scheduleController'; // adjust import path as necessary


// OBTAIN A DAILY REPORT
export const getDailyReport = async (req: Request, res: Response) => {
    const today = moment.utc().startOf('day').toDate();
    const tomorrow = moment(today).add(1, 'day').toDate();

    try {
        const accessesToday = await Booking.find({
            where: {
                entry_datetime: MoreThanOrEqual(today),
                exit_datetime: LessThanOrEqual(tomorrow)
            },
        });

        let userEntries: { [key: number]: number } = {};
        accessesToday.forEach(booking => {
            userEntries[booking.user_id] = (userEntries[booking.user_id] || 0) + 1;
        });

        let frequentUsers: number[] = [];
        let infrequentUsers: number[] = [];
        Object.keys(userEntries).forEach(userId => {
            const id = Number(userId);
            if (userEntries[id] > 1) frequentUsers.push(id);
            else infrequentUsers.push(id);
        });

        const totalEntries = accessesToday.length;
        const totalAbsences = accessesToday.filter(acc => acc.state === 'cancelled').length;

        const newReport = new Report();
        newReport.report_date = today;
        newReport.total_entries = totalEntries;
        newReport.total_absences = totalAbsences;
        newReport.frequent_users = JSON.stringify(frequentUsers);
        newReport.infrequent_users = JSON.stringify(infrequentUsers);
        await newReport.save();

        res.status(201).json({
            success: true,
            message: "Daily report for today created successfully.",
            data: newReport
        });
    } catch (error: any) {
        console.error("Error creating daily report:", error);
        res.status(500).json({
            success: false,
            message: "Error in creating the daily report.",
            error: error.message
        });
    }
};

//OBTAIN DATETIME PERIOD REPORT
export const getDateReport = async (req: Request, res: Response) => {
    const { start_time, end_time } = req.body;

    if (!start_time || !end_time) {
        return res.status(400).json({
            success: false,
            message: "Both start date and end date are required fields!"
        });
    }

    // Creating Date objects directly
    const startDate = new Date(start_time);
    const endDate = new Date(end_time);

    try {
        const accesses = await Booking_History.find({
            where: {
                entry_datetime: MoreThanOrEqual(startDate),
                exit_datetime: LessThanOrEqual(endDate)
            }
        });

        if (accesses.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No access history records found for the given date range."
            });
        }

        let userEntries: { [key: number]: number } = {};
        accesses.forEach(access => {
            userEntries[access.user_id] = (userEntries[access.user_id] || 0) + 1;
        });

        let frequentUsers: number[] = [];
        let infrequentUsers: number[] = [];
        Object.keys(userEntries).forEach(userId => {
            const numEntries = userEntries[Number(userId)];
            if (numEntries > 3) frequentUsers.push(Number(userId));
            else if (numEntries <= 2) infrequentUsers.push(Number(userId));
        });

        const totalEntries = accesses.length;
        const totalAbsences = accesses.filter(acc => acc.access_state === 'no-show').length;

        const newReport = new Report(); 
        newReport.report_date = new Date();
        newReport.total_entries = totalEntries;
        newReport.total_absences = totalAbsences;
        newReport.frequent_users = JSON.stringify(frequentUsers);
        newReport.infrequent_users = JSON.stringify(infrequentUsers);
        await newReport.save();

        res.json({
            success: true,
            message: "Report for the specified date range retrieved successfully.",
            data: newReport
        });

    } catch (error) {
        console.error("Error obtaining date period report:", error);
        res.status(500).json({
            success: false,
            message: "Error obtaining the date period report.",
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
// REPORT FOR SPECIFIC ROOM
export const getRoomReport = async (req: Request, res: Response) => {
    const roomId = parseInt(req.params.id);
    if (isNaN(roomId)) {
        return res.status(400).json({ success: false, message: "Invalid room ID format." });
    }

    try {
        const accesses = await Booking_History.find({
            where: { room_id: roomId },
            order: { entry_datetime: "ASC" }
        });

        if (accesses.length === 0) {
            return res.status(404).json({ success: false, message: "No access records found for this room." });
        }

        res.json({
            success: true,
            message: "Access records for the room retrieved successfully.",
            data: accesses
        });
    } catch (error) {
        console.error("Error obtaining report for the room:", error);
        res.status(500).json({
            success: false,
            message: "Error obtaining report for the selected room!",
            error: (error as Error).message
        });
    }
};

//TO DELETE A REPORT
export const deleteReport = async (req: Request, res: Response) => {
    const reportId = parseInt(req.params.id);

    // Validate the report ID
    if (isNaN(reportId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid report ID format"
        });
    }

    try {
        const report = await Report.findOneBy({ id: reportId });

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found!"
            });
        }

        // Delete the report
        await Report.delete({ id: reportId });

        res.status(200).json({
            success: true,
            message: "Report deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting report:", error);
        res.status(500).json({
            success: false,
            message: "Error deleting the report",
            error: (error as Error).message
        });
    }
};

export const triggerMoveReservationsToHistory = async (req: Request, res: Response) => {
    try {
        await moveExpiredReservationsToHistory();
        return res.status(200).json({
            success: true,
            message: 'Expired reservations moved to history successfully.'
        });
    } catch (error) {
        console.error("Failed to move expired reservations to history:", error);
        return res.status(500).json({
            success: false,
            message: 'Failed to move reservations due to an internal error.',
            error: (error as Error).message
        });
    }
};