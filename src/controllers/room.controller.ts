import { Request, Response } from "express";
import { Room } from "../database/models/Room";
import { Booking } from "../database/models/Booking";
import { IsNull } from "typeorm";

// GET ALL ROOMS
export const getAllRooms = async (req: Request, res: Response) => {
    try {
        const rooms = await Room.find();
        res.json({
            success: true,
            message: "Rooms retrieved successfully.",
            data: rooms
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving rooms.",
            error: error
        });
    }
};

// GET A SPECIFIC ROOM
export const getRoomById = async (req: Request, res: Response) => {
    const roomId = parseInt(req.params.id);
    try {
        const room = await Room.findOneBy({ id: roomId });
        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found."
            });
        }
        res.json({
            success: true,
            message: "Room retrieved successfully.",
            data: room
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving room.",
            error: error
        });
    }
};

// CREATE NEW ROOM
export const createRoom = async (req: Request, res: Response) => {
    const { room_name, capacity, room_type } = req.body;
    try {
        const newRoom = Room.create({
            room_name,
            capacity,
            room_type
        });
        await Room.save(newRoom);
        res.status(201).json({
            success: true,
            message: "Room created successfully.",
            data: newRoom
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating room.",
            error: error
        });
    }
};

// UPDATE ROOM
export const updateRoom = async (req: Request, res: Response) => {
    const roomId = parseInt(req.params.id);
    const { room_name, capacity, room_type } = req.body;
    try {
        const room = await Room.findOneBy({ id: roomId });
        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found."
            });
        }
        Room.merge(room, { room_name, capacity, room_type });
        const updatedRoom = await Room.save(room);
        res.json({
            success: true,
            message: "Room updated successfully.",
            data: updatedRoom
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating room.",
            error: error
        });
    }
};

// DELETE ROOM
export const deleteRoom = async (req: Request, res: Response) => {
    const roomId = parseInt(req.params.id);
    try {
        const room = await Room.findOneBy({ id: roomId });
        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found."
            });
        }
        await Room.remove(room);
        res.json({
            success: true,
            message: "Room deleted successfully."
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting room.",
            error: error
        });
    }
};

//GET STATE
export const getRoomCurrentStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const roomId = parseInt(id, 10);

        if (isNaN(roomId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid room ID',
            });
        }

        const room = await Room.findOneBy({ id: roomId });
        if (!room) {
            return res.status(404).json({ 
                success: false, 
                message: "Room not found." 
            });
        }

        const users = await Booking.find({
            where: {
                room_id: roomId,
                state: "checked-in"
            },
            relations: ['user']
        });

        return res.status(200).json({
            success: true,
            message: 'Room state retrieved successfully',
            data: {
                room: {
                    room_id: room.id,
                    room_name: room.room_name,
                    capacity: room.capacity,
                    room_type: room.room_type
                },
                users: users.map(booking => ({
                    id: booking.user.id,
                    email: booking.user.email,
                    username: booking.user.username
                }))
            },
        });
    } catch (error) {
        console.error("Error retrieving room status:", error);
        res.status(500).json({
            success: false,
            message: "Error recieving room state.",
            error: error
        });
    }
};