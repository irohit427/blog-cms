import { Router } from 'express';
import profile from '../controllers/user/profile';

const router = Router();
router.get('/profile',  profile)
export default router;