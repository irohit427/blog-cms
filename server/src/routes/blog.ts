import { Router } from 'express';
import passport from 'passport';
import createBlog from '../controllers/blog/createBlog';

const router = Router();
router.post('/blog', passport.authenticate('jwt', {session: false}), createBlog);

export default router;