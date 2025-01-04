import express from 'express'
import adminAuth from '../middleware/admin.auth.js';
import { getAllUser } from '../controllers/users.controller.js';

const getUserRoute = express.Router();

getUserRoute.post('/list',adminAuth, getAllUser)

export default getUserRoute;
