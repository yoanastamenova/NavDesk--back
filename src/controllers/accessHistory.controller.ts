import { Request, Response } from "express";
import { Access_history } from "../database/models/Access_history";

//GET HISTORY BY DATE
export const getHistories = async (req: Request, res: Response) => {
    try {
        
    } catch (err) {
        res.status(500).json(
            {
                success: false,
                message: "Error obtaining access histories for the selected date range!",
                error: err
            }
        )
    }
}

//GET HISTORY BY ROOM ID
export const getRoomHistory = async (req: Request, res: Response) => {
    try {
        const roomId = parseInt(req.params.id);

        const room = await Access_history.findOneBy({
            id: roomId
        })
        
        if(!room){
            return res.status(404).json(
                {
                    success: false,
                    message: "The selected room does not exist!"
                }
            )
        }

        return res.status(200).json({
            success: true,
            message: "History for the selected room obtained successfully!",
            data: room
        })
        
    } catch (err) {
        res.status(500).json(
            {
                success: false,
                message: "Error obtaining access histories for the selected room!",
                error: err
            }
        )
    }
}