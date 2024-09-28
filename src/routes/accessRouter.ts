import express from "express";
import { cancelReserve, checkIn, checkOut, getCurrentAccess, newReservation } from "../controllers/access.controller";
import { auth } from "../middlewares/auth";

const router = express.Router();

// Correctly accessing the room id if needed for access querying
router.get('/room/:id', auth, getCurrentAccess);

// Adding :id to check-in and check-out paths to capture reservationId
router.post('/check-in/:id', auth, checkIn);
router.post('/check-out/:id', auth, checkOut);

// For creating a new reservation
router.post('/reserve', auth, newReservation);

// Cancel a selected reservation by its ID
router.delete('/cancel/:id', auth, cancelReserve);

export default router;