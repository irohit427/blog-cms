import { Request, Response } from 'express';
import Blog from '../../models/Blog';

const getBlogs = (req: Request, res: Response) => {
  Blog.find().then(blogs => {
    res.status(200).json({blogs});
  }).catch(err => res.status(500).json({err}));
}

export default getBlogs;