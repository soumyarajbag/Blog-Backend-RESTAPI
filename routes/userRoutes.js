import express from 'express';
import {AddNewUser, getAllUsers , LoginUser } from '../controllers/userController.js';
const router = express.Router();

router.get('/' , getAllUsers);
router.post("/signup" , AddNewUser );
router.post("/login" , LoginUser);
export default router;