import express from "express";
import { cancelReserve, checkIn, checkOut, getCurrentAccess, newReserve } from "../controllers/access.controller";
import { auth } from "../middlewares/auth";

const router = express.Router();

router.get('/current/room/:id', auth, getCurrentAccess)
router.post('/check-in', auth, checkIn)
router.post('/check-out', auth, checkOut)
router.post('/reserve', auth, newReserve)
router.post('/cancel', auth, cancelReserve)

export default router;