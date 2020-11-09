import { Request, Response } from 'express';
import Blog from '../../models/Blog';


const deleteBlog = (req: Request, res: Response) => {
  const id = req.params.id;
  Blog.findByIdAndRemove(id).then(blog => {
    res.status(200).json({blog});
  }).catch(err => res.status(500).json({err}));
}

export default deleteBlog;