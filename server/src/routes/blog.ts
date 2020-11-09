import { Router } from 'express';
import getBlogs from '../controllers/blog/getBlogs';
import createBlog from '../controllers/blog/createBlog';
import getBlog from '../controllers/blog/getBlog';
import deleteBlog from '../controllers/blog/deleteBlog';

const router = Router();
router.post('/', createBlog);
router.get('/', getBlogs);
router.get('/:id', getBlog);
router.delete('/:id', deleteBlog);

export default router;