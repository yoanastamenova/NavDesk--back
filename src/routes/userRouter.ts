import express from "express";
import { deleteUser, getAllUsers, getUserCurrentAccess, 
    getUserById, modifyUser, getUserAccessHistory, 
    getUserFullProfile} from "../controllers/user.controller";
import { auth } from "../middlewares/auth";
import { isAdmin } from "../middlewares/admin";

const router = express.Router();

router.get('/all-users', auth, isAdmin, getAllUsers); 
router.get('/profile', auth, getUserFullProfile)
router.get('/:id', auth, isAdmin, getUserById);
router.get('/:id/current-access', auth, isAdmin, getUserCurrentAccess);
router.get('/:id/access-history', auth, isAdmin, getUserAccessHistory);
router.put('/profile/update', auth, modifyUser);
router.delete('/:id', auth, isAdmin, deleteUser);

export default router;