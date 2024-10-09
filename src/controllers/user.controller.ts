import { Request, Response } from "express";
import { User } from "../database/models/User";
import { Booking } from "../database/models/Booking";
import { IsNull } from "typeorm";
import { Booking_History } from "../database/models/Booking_history";

//GET ALL
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find(
            {
                select: {
                    username: true,
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

// GET FULL USER PROFILE WITH DETAILS AND ACCESS INFO
export const getUserFullProfile = async (req: Request, res: Response) => {
    const userId = req.tokenData.id; 

    try {
        // Get basic user details
        const userDetails = await User.findOne({
            select: {
                username: true,
                email: true,
                startup: true,
                dni: true,
                phone: true
            },
            where: { id: userId }
        });

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        // Get current access
        const currentAccess = await Booking.findOne({
            where: {
                user_id: userId,
                exit_datetime: IsNull()
            },
            relations: ['room']
        });

        // Get access history
        const accessHistory = await Booking_History.find({
            where: {
                user_id: userId
            },
            relations: ['room'],
            order: {
                entry_datetime: 'DESC'
            }
        });

        // Send combined data
        res.status(200).json({
            success: true,
            message: "Full user profile retrieved successfully.",
            data: {
                userDetails,
                currentAccess: currentAccess || "No current access.",
                accessHistory: accessHistory.length > 0 ? accessHistory : "No access history."
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving user profile.",
            error: error
        });
    }
}

//GET A SPECIFIC USER
export const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);
        const user = await User.findOne(
            {
                select: {
                    username: true,
                    email: true
                },
                where: {
                    id: userId
                }
            }
        )
        res.status(200).json(
            {
                success: true,
                message: "User retrived!",
                data: user
            }
        )
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error getting the selected user!",
            error: error
        })
    }
}

//GET A SPECIFIC USER ACCESSES 
export const getUserCurrentAccess = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);

    try {
        const currentAccess = await Booking.findOne({
            where: {
                user_id: userId,
                exit_datetime: IsNull()
            },
            relations: ['room']
        });

        if (!currentAccess) {
            return res.status(404).json({
                success: false,
                message: "No current access found for user."
            });
        }

        res.json({
            success: true,
            message: "Current access retrieved successfully.",
            data: currentAccess
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving current access.",
            error: error
        });
    }
}

//GET A SPECIFIC USER HISTORY OF ACCESSES 
export const getUserAccessHistory = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);

    try {
        const accessHistory = await Booking_History.find({
            where: {
                user_id: userId
            },
            relations: ['room'], 
            order: {
                entry_datetime: 'DESC'
            }
        });

        if (accessHistory.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No access history found for user."
            });
        }

        res.json({
            success: true,
            message: "Access history retrieved successfully.",
            data: accessHistory
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving access history.",
            error: error
        });
    }
}

//UPDATE USER
export const modifyUser = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.id; 
        
        const { id, ...updateData } = req.body;
        const user = await User.update({ id: userId }, updateData);
        
        res.json({
            success: true,
            message: "User info updated!",
            data: user
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({
            success: false,
            message: "Error updating user",
            error: (error as Error).message
        });
    }
};

//DELETE USER
export const deleteUser = async (req:Request, res: Response) => {
    try {
        const userID = req.params.id

        const user = await User.findOneBy({
            id: parseInt(userID)
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found! Check ID!"
            })
        }

        const deletedUser = await User.delete({
            id: parseInt(userID)
        }
        )

        return res.status(200).json({
            success: true,
            message: "User was deleted successfully!",
            data: deletedUser
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User can't be deleted",
            error: error
        })
    }
}