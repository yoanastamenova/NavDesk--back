import { Request, Response } from "express";
import { User } from "../database/models/User";
import bcrypt from "bcrypt";

//GET ALL
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find(
            {
                select: {
                    first_name: true,
                    last_name: true,
                    email: true,
                    startup: true
                }
            }
        )

        res.json(
            {
                success: true,
                message: "All users retrived successfully!",
                data: users
            }
        )
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error getting all the users",
            error: error
        })
    }
}

//GET A SPECIFIC USER
export const getUserById = async (req: Request, res: Response) => {
    const userId = req.tokenData.id;

    const user = User.findOne(
        {
            select: {
                first_name: true,
                last_name: true,
                email: true,
                role: true
            },
            where: {
                id: userId
            }
        }
    )
}

//POST

//DELETE