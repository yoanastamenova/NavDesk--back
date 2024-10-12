import express from "express";
import { auth } from "../middlewares/auth";
import { isAdmin } from "../middlewares/admin";
import { deleteReport, getDailyReport, getDateReport, getRoomReport, triggerMoveReservationsToHistory } from "../controllers/report.controller";

const router = express.Router();

router.post('/daily', auth, isAdmin, getDailyReport)
router.post('/room-usage/:id', auth, isAdmin, getRoomReport)
router.post('/period', auth, isAdmin, getDateReport)
router.delete('/delete/:id', auth, isAdmin, deleteReport)
// Add new route for triggering history move
router.post('/trigger', auth, isAdmin, triggerMoveReservationsToHistory);
export default router;