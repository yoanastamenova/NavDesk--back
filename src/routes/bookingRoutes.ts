import express from "express";
import { cancelReserve, checkIn, checkOut, getCurrentAccess, getUserBookings, newReservation, updateReservation } from "../controllers/booking.controller";
import { auth } from "../middlewares/auth";

const router = express.Router();

//Get a room current users by its ID
router.get('/room/:id', auth, getCurrentAccess);

// User bookings which can be edited/deleted
router.get('/user_bookings', auth, getUserBookings);

// Check-in/Out
router.post('/check-in/:id', auth, checkIn);
router.post('/check-out/:id', auth, checkOut);

// For creating a new reservation
router.post('/reserve', auth, newReservation);

//Update a reservation
router.put('/update/:id', auth, updateReservation);

// Cancel a selected reservation by its ID
router.delete('/cancel/:id', auth, cancelReserve);

export default router;