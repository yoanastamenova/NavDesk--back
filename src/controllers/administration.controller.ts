import { Request, Response } from "express";
import { MoreThanOrEqual, LessThan, Between } from "typeorm";
import { Access } from "../database/models/Access";
import { Administration } from "../database/models/Administration";
import { Access_History } from "../database/models/Access_history";

// OBTAIN A DAILY REPORT
export const getDailyReport = async (req: Request, res: Response) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    try {
        const accessesToday = await Access.find({
            where: {
                entry_datetime: MoreThanOrEqual(today),
                exit_datetime: LessThan(tomorrow)
            }
        });

        // Define userEntries with a specific type
        let userEntries: { [key: number]: number } = {}; // Change to number if user_id is a number
        accessesToday.forEach(access => {
            userEntries[access.user_id] = (userEntries[access.user_id] || 0) + 1;
        });

        // Determine frequent and infrequent users based on the entries
        let frequentUsers: string[] = []; // Specify type as string[]
        let infrequentUsers: string[] = []; // Specify type as string[]
        Object.keys(userEntries).forEach(userId => {
            const id = Number(userId); // Convert userId to number
            if (userEntries[id] > 1) frequentUsers.push(id.toString());
            else if (userEntries[id] <= 2) infrequentUsers.push(id.toString());
        });

        // Update the condition to match the correct state types
        const totalAbsences = accessesToday.filter(acc => acc.state === 'cancelled').length; // Change 'no-show' to 'cancelled'

        const totalEntries = accessesToday.length; // Add this line to define totalEntries
        const newReport = new Administration();
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
    } catch (error) {
        console.error("Error creating daily report:", error);
        res.status(500).json({
            success: false,
            message: "Error in creating the daily report.",
            error: (error as Error).message
        });
    }
};

//OBTAIN DATETIME PERIOD REPORT
export const getDateReport = async (req: Request, res: Response) => {
    const { start_date, end_date } = req.body;

    if (!start_date || !end_date) {
        return res.status(400).json({
            success: false,
            message: "Both start date and end date are required fields!"
        });
    }

    const startDate = new Date(start_date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(end_date);
    endDate.setHours(23, 59, 59, 999);

    try {
        const accesses = await Access_History.find({
            where: {
                entry_datetime: Between(startDate, endDate)
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

        // Use Administration or a new model if administration should not be mixed with access history
        const newReport = new Administration(); // or new AccessHistoryReport(); if a separate model
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
            error: (error as Error).message
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
        const accesses = await Access.find({
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
        const report = await Administration.findOneBy({ id: reportId });

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found!"
            });
        }

        // Delete the report
        await Administration.delete({ id: reportId });

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