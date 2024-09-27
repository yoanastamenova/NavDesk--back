import express from "express";
import { deleteUser, getAllUsers, getUserCurrentAccess, 
    getUserById, modifyUser, getUserAccessHistory } from "../controllers/user.controller";

const router = express.Router();

router.get('/all-users', getAllUsers); 
router.get('/:id', getUserById);
router.get('/:id/current-access', getUserCurrentAccess);
router.get('/:id/access-history', getUserAccessHistory);
router.put('/:id', modifyUser);
router.delete('/:id', deleteUser);

export default router;