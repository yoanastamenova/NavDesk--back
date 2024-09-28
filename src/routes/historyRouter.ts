import express from "express";
import { getHistories, getRoomHistory } from "../controllers/accessHistory.controller";

const router = express.Router();

router.get('/room/:id', getRoomHistory)        //gets the access histories of a specific room id
router.get('/', getHistories)      //gets the access histories for a specific date range

export default router;