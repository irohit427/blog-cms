import { Router } from 'express';
import users from '../controllers/user/users';
import profile from '../controllers/user/profile';
import getUser from '../controllers/user/getUser';
import deleteUser from '../controllers/user/deleteUser';

const router = Router();
router.get('/profile',  profile)
router.get('/all', users)
router.get('/:id', getUser)
router.delete('/:id', deleteUser);
export default router;