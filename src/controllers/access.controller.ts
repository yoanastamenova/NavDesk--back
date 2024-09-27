import { Request, Response } from "express";
import { Access } from "../database/models/Access";

//GET CURRENT ACCESS
export const getCurrentAccess = async (req: Request, res: Response) => {
    try {

            const accesses = Access.find(
            {
                select: {
                    user_id: true,
                    room_id: true,
                    entry_datetime: true,
                    exit_datetime: true,
                    state: true
                }
            }
        )

        res.json(
            {
                success: true,
                message: "All current access requests are retrived successfully!",
                data: accesses
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

//REGISTER CHECK-IN
export const checkIn = async (req: Request, res: Response) => {
    try {
        const reservationId = req.params.id;

        const reservation = await Access.findOneBy({ id: parseInt(reservationId) });
        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: "No reservation found with the provided ID"
            });
        }

        if (new Date(reservation.entry_datetime) <= new Date()) {
            return res.status(400).json({
                success: false,
                message: "Check-in time has not started yet"
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
        res.status(500).json({
            success: false,
            message: "Error during check-in",
            error: error
        });
    }
};

//REGISTER CHECK-OUT
export const checkOut = async (req: Request, res: Response) => {
    try {
        const reservationId = req.params.id;

        const reservation = await Access.findOneBy({ id: parseInt(reservationId) });
        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: "No reservation found with the provided ID"
            });
        }

        if (new Date() < new Date(reservation.entry_datetime)) {
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
        res.status(500).json({
            success: false,
            message: "Error during check-out",
            error: error
        });
    }
};

//CREATE RESERVATION
export const newReserve = async(req: Request, res: Response) => {
    try {
        const room_id = req.body.room_id;
        const user_id = req.tokenData.id;

        if(!user_id || !room_id){
            return res.status(400).json({
                success: false,
                message: "Room number is needed for creating a new reservation!"
            })
        }

        const reservation = await Access.create(
            {
                room_id: room_id,
                user_id: user_id
            }
        ).save()

        res.status(201).json(
            {
                success: true,
                message: "New reservation created successfully!",
                data: reservation
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error creating a new reservation!",
                error: error
            }
        )
    }
}

//CANCEL RESERVATION
export const cancelReserve = async(req: Request, res: Response) => {
    try {
        const reservationId = req.body.id;

        const reservation = await Access.findOneBy({
            id: parseInt(reservationId)
        })

        if(!reservation) {
            return res.status(404).json({
                success: false,
                message: "No reservation with this ID exists!"
            })
        }

        const cancelation = await Access.delete({
            id: parseInt(reservationId)
        })

        return res.status(200).json({
            success: true,
            message: "Reservation cancelled successfully!",
            data: cancelation
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Reservation can't be cancelled",
            error: error
        })
    }
}