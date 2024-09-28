import { Request, Response } from "express";
import { Access } from "../database/models/Access";
import { Administration } from "../database/models/Administration";

// OBTAIN A DAILY REPORT
export const getDailyReport = async (req: Request, res: Response) => {
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

//OBTAIN DATETIME PERIOD REPORT
export const getDateReport = async (req: Request, res: Response) => {
    try {
            const date = req.body.date;
    
            const period = await Administration.find(
                {
                    select: {
                        report_date: true,
                        total_absences: true,
                        total_accesses: true,
                        frequent_users: true,
                        infrequent_users: true
                    },
                    where: {
                        report_date: date
                    }
                }
            )
    
            if(!period) {
                return res.status(404).json(
                    {
                        success: false,
                        message: "Cannot obtain report for this date!"
                    }
                )
            }
    
            res.status(200).json(
                {
                    success: true,
                    message: "The Report for this date was retrived successfully!",
                    data: period
                }
            )
        }
     catch (error) {
        res.status(500).json(
            {
                success: false,

            }
        )
     }
}

// REPORT FOR SPECIFIC ROOM
