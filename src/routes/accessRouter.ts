import express from "express";
import {  } from "../controllers/access.controller";

const router = express.Router();

router.get('/current/room/:id')
router.post('/check-in')
router.post('/check-out')
router.post('/reserve')
router.post('/cancel')

export default router;