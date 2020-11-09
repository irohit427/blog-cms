import { Router } from 'express';
import getBlog from '../controllers/public/getBlog';
import getBlogs from '../controllers/public/getBlogs';
const router = Router();

router.get('/blogs', getBlogs);
router.get('/blog/:id', getBlog);

export default router;