import express from "express";
import {
    getAllRooms,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom,
    getRoomCurrentStatus  
} from "../controllers/room.controller";

const router = express.Router();

router.get('/all', getAllRooms);
router.get('/:id', getRoomById);
router.get('/:id/current-state', getRoomCurrentStatus);
router.post('/create', createRoom); 
router.put('/:id/update-room', updateRoom);
router.delete('/:id/delete', deleteRoom); 

export default router;