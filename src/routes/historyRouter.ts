import express from "express";
import { getHistories, getRoomHistory } from "../controllers/history.controller";
import { isAdmin } from "../middlewares/admin";
import { auth } from "../middlewares/auth";

const router = express.Router();

router.get('/room/:id', auth, isAdmin, getRoomHistory)        //gets the access histories of a specific room id
router.get('/period', auth, isAdmin, getHistories)      //gets the access histories for a specific date range

export default router;