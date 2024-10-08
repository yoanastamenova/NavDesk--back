import express from "express";
import {
    getAllRooms,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom,
    getRoomCurrentStatus  
} from "../controllers/room.controller";
import { isAdmin } from "../middlewares/admin";
import { auth } from "../middlewares/auth";

const router = express.Router();

router.get('/all',getAllRooms);
router.get('/:id', auth, getRoomById);
router.get('/:id/current-state', getRoomCurrentStatus);
router.post('/create', auth, isAdmin, createRoom); 
router.put('/:id/update', auth, isAdmin, updateRoom);
router.delete('/:id/delete', auth, isAdmin, deleteRoom); 

export default router;