import express from "express";
import { deleteUser, getAllUsers, getUserAccess, getUserById, getUserHistory, modifyUser } from "../controllers/user.controller";

const router = express.Router();

router.get('/all-users', getAllUsers); 
router.get('/user-by-id', getUserById);
router.get('/:id/current-access', getUserAccess);
router.get('/:id/access-history', getUserHistory);
router.put('/update', modifyUser);
router.delete('/delete', deleteUser);

export default router;