import { Request, Response } from "express";
import { Access } from "../database/models/Access";

// OBTAIN A DAILY REPORT
export const register = async (req: Request, res: Response) => {
    try {
        const date = req.body.date;

        if(!date){
            return res.status(400).json({
                success: false,
                message: "Date is required field!"
            })
        }

        const report = await Access.find(
            {
                select: {
                    room_id: true,
                    user_id: true,
                    entry_datetime: true,
                    exit_datetime: true
                },
                where: {
                    entry_datetime: date,
                    exit_datetime: date
                }
            }
        )

        return res.status(200).json({
            success: true,
            message: "Daily report created!",
            data: report
        })

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error in obtaining the daily report!",
                error: error
            }
        )
    }
}

