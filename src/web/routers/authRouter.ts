import { Router } from 'express';
import * as authController from '../controllers/authController';

const router = Router();

router.get('/', authController.handleGetLogin);

router.get('/logout', authController.handleGetLogout);

router.get('/auth/steam', authController.handleSteamAuth);

router.get('/auth/steam/callback', authController.handleSteamAuthCallback);

export default router;
