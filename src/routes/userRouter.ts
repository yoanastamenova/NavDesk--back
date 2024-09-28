import express from "express";
import { deleteUser, getAllUsers, getUserCurrentAccess, 
    getUserById, modifyUser, getUserAccessHistory } from "../controllers/user.controller";
import { newReserve } from "../controllers/access.controller";
import { auth } from "../middlewares/auth";
import { isAdmin } from "../middlewares/admin";

const router = express.Router();

router.get('/all-users', auth, isAdmin, getAllUsers); 
router.get('/:id', auth, isAdmin, getUserById);
router.get('/:id/current-access', auth, isAdmin, getUserCurrentAccess);
router.get('/:id/access-history', auth, isAdmin, getUserAccessHistory);
router.put('/:id', auth, modifyUser);
router.delete('/:id', auth, isAdmin, deleteUser);
router.post('/reserve', auth, newReserve)

export default router;