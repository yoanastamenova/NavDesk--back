import { Request, Response } from "express";
import { User } from "../database/models/User";
import bcrypt from "bcrypt";
import { Access } from "../database/models/Access";
import { Access_history } from "../database/models/Access_history";
import { IsNull } from "typeorm";

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
    try {
        const userId = req.tokenData.id
    
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
        const currentAccess = await Access.findOne({
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
        const accessHistory = await Access_history.find({
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
        const user = await User.update(
            {
              id: req.tokenData.id
            },
            {
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              email: req.body.email,
              startup: req.body.startup,
              dni: req.body.dni,
              phone: req.body.phone
            }
          )
      
          res.json(
            {
              success: true,
              message: "User info updated!",
              data: user
            }
          )
        } catch (error) {
          res.status(500).json(
            {
              success: false,
              message: "Error updating user",
              error: error
            }
          )
        }
}

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