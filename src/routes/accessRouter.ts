import express from "express";
import { cancelReserve, checkIn, checkOut, getCurrentAccess, newReserve } from "../controllers/access.controller";

const router = express.Router();

router.get('/current/room/:id' ,getCurrentAccess)
router.post('/check-in', checkIn)
router.post('/check-out', checkOut)
router.post('/reserve', newReserve)
router.post('/cancel', cancelReserve)

export default router;