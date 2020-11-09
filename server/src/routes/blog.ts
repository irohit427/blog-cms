import { Router } from 'express';
import createBlog from '../controllers/blog/createBlog';

const router = Router();
router.post('/blog', createBlog);

export default router;